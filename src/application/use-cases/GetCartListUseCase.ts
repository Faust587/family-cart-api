import {IGetCartListUseCase} from '../interfaces/IGetCartListUseCase';
import {IUserRepository} from '../../domain/repositories/IUserRepository';
import {ICartRepository} from '../../domain/repositories/ICartRepository';
import {IRoleAssignmentRepository} from '../../domain/repositories/IRoleAssignmentRepository';
import {ICartItemRepository} from '../../domain/repositories/ICartItemRepository';

export class GetCartListUseCase implements IGetCartListUseCase{
  constructor(private userRepository: IUserRepository,
              private cartRepository: ICartRepository,
              private roleAssignmentRepository: IRoleAssignmentRepository,
              private cartItemRepository: ICartItemRepository
  ) {}

  async execute(userId: number) {
    const userRoleAssignments = await this.roleAssignmentRepository.getByUserId(userId);
    const onlyOwnerAssignments = userRoleAssignments.filter(item => item.role === "OWNER").map(item => item.cart.id);
    const onlyMemberAssignments = userRoleAssignments.filter(item => item.role === "MEMBER").map(item => item.cart.id);
    const userOwnCarts: {
      isOwner: boolean;
      name: string;
      id: number | null
    }[] = (await Promise.all(onlyOwnerAssignments.map(cartId => this.cartRepository.getById(cartId))))
      .map(item => ({...item, isOwner: true}));
    const userGuessCarts: {
      isOwner: boolean;
      name: string;
      id: number | null
    }[] = (await Promise.all(onlyMemberAssignments.map(cartId => this.cartRepository.getById(cartId))))
      .map(item => ({...item, isOwner: false}));

    const allCarts = [...userGuessCarts, ...userOwnCarts];
    const members = await Promise.all(allCarts.map(cart => this.roleAssignmentRepository.getByCartId(cart.id)));

    const flatData = members.flat();

    const groupedByCartId = flatData.reduce((accumulator, currentItem) => {
      const cartId = currentItem.cart.id;

      if (!accumulator[cartId]) {
        accumulator[cartId] = [];
      }

      accumulator[cartId].push(currentItem);
      return accumulator;
    }, {});

    const cartsWithMembers = allCarts.map(cart => {
      if (!groupedByCartId[cart.id]) return {
        ...cart,
        members: []
      }
      return {
        ...cart,
        members: groupedByCartId[cart.id].map((member) =>
          ({id: member.user.id, name: member.user.name, email: member.user.email, role: member.role}))
      }
    })

    const cartItems = (await Promise.all(cartsWithMembers.map((item) => {
      return this.cartItemRepository.getByCartId(item.id);
    })))
      .map(item =>
        item.length > 0 ? [item[0].cart.id, item.map(cartItem =>
          ({id: cartItem.id, name: cartItem.name, isDone: cartItem.isDone, cartId: cartItem.cart.id}))]
          : null).filter((item) => item !== null);

    const formattedCartItems = Object.fromEntries(cartItems);

    return cartsWithMembers.map((cart) => {
      if (formattedCartItems[cart.id] === undefined) return {...cart, items: []};

      return {...cart, items: formattedCartItems[cart.id]}
    })
  }
}
