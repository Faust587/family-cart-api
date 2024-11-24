import {Router} from 'express';
import {CartController} from '../../interfaces/controllers/CartController';
import {CreateCartUseCase} from '../../application/use-cases/CreateCartUseCase';
import {UserRepositoryImpl} from '../persistence/UserRepositoryImpl';
import {CartRepositoryImpl} from '../persistence/CartRepositoryImpl';
import {RoleAssignmentRepositoryImpl} from '../persistence/RoleAssignmentRepositoryImpl';
import {DatabaseTransactions} from '../database/DatabaseTransactions';
import {AddItemToCartUseCase} from '../../application/use-cases/AddItemToCartUseCase';
import {CartItemRepositoryImpl} from '../persistence/CartItemRepositoryImpl';
import {UpdateCartItemDoneStatus} from '../../application/use-cases/UpdateCartItemDoneStatus';
import {GetCartListUseCase} from '../../application/use-cases/GetCartListUseCase';
import {DeleteCartUseCase} from '../../application/use-cases/DeleteCartUseCase';
import {AddUserToCartUseCase} from '../../application/use-cases/AddUserToCartUseCase';
import {RemoveUserFromCart} from '../../application/use-cases/RemoveUserFromCart';
import {RenameCartUseCase} from '../../application/use-cases/RenameCartUseCase';
import {RemoveItem} from '../../application/use-cases/RemoveItem';

const userRepository = new UserRepositoryImpl();
const cartRepository = new CartRepositoryImpl();
const roleAssignmentRepository = new RoleAssignmentRepositoryImpl();
const databaseTransaction = new DatabaseTransactions()
const cartItemRepository = new CartItemRepositoryImpl();

const createCartUseCase = new CreateCartUseCase(userRepository, cartRepository, roleAssignmentRepository, databaseTransaction)
const addItemToCartUseCase = new AddItemToCartUseCase(cartItemRepository, cartRepository);
const updateItemDoneStatus = new UpdateCartItemDoneStatus(cartItemRepository);
const getCartListUseCase = new GetCartListUseCase(userRepository, cartRepository, roleAssignmentRepository, cartItemRepository);
const deleteCartUseCase = new DeleteCartUseCase(userRepository, cartRepository, roleAssignmentRepository, databaseTransaction);
const addUserToCartUseCase = new AddUserToCartUseCase(userRepository, cartRepository, roleAssignmentRepository);
const removeUserFromCartUseCase = new RemoveUserFromCart(roleAssignmentRepository);
const renameCartUseCase = new RenameCartUseCase(userRepository, cartRepository, roleAssignmentRepository);
const removeItemFromCart = new RemoveItem(userRepository, cartItemRepository, roleAssignmentRepository, databaseTransaction);

const cartController = new CartController(
  createCartUseCase,
  addItemToCartUseCase,
  updateItemDoneStatus,
  getCartListUseCase,
  deleteCartUseCase,
  addUserToCartUseCase,
  renameCartUseCase,
  removeUserFromCartUseCase,
  removeItemFromCart
);

export const CartRoutes = Router();

CartRoutes.get('/', cartController.getCarts);

CartRoutes.patch('/change-done-status/:id', cartController.updateCartItemDoneStatus);
CartRoutes.patch('/rename/:id', cartController.renameCart);

CartRoutes.post('/', cartController.createCart);
CartRoutes.post('/add-item', cartController.addItemToCart);
CartRoutes.post('/add-user-to-cart', cartController.addUserToCart);
CartRoutes.post('/remove-user-from-cart', cartController.removeUserFromCart);

CartRoutes.delete('/:id', cartController.deleteCart);
CartRoutes.delete('/item/:id', cartController.removeItemFromCart);
