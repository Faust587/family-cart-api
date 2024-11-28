import {ICreateCartUseCase} from '../../application/interfaces/ICreateCartUseCase';
import {validateRequest} from '../../infrastructure/middlewares/validateRequest';
import {CreateCartDTO} from '../../application/dtos/CreateCartDTO';
import {validateToken} from '../../infrastructure/middlewares/validateToken';
import {Request, Response} from 'express';
import {IAddItemToCartUseCase} from '../../application/interfaces/IAddItemToCartUseCase';
import {AddItemToCartDTO} from '../../application/dtos/AddItemToCartDTO';
import {UpdateItemActiveStatusDTO} from '../../application/dtos/UpdateItemActiveStatusDTO';
import {IUpdateCartItemDoneStatus} from '../../application/interfaces/IUpdateCartItemDoneStatus';
import {IGetCartListUseCase} from '../../application/interfaces/IGetCartListUseCase';
import {IDeleteCartUseCase} from '../../application/interfaces/IDeleteCartUseCase';
import {AddUserToCartDTO} from '../../application/dtos/AddUserToCartDTO';
import {IAddUserToCartUseCase} from '../../application/interfaces/IAddUserToCartUseCase';
import {IRemoveUserFromCart} from '../../application/interfaces/IRemoveUserFromCart';
import {IRenameCartUseCase} from '../../application/interfaces/IRenameCartUseCase';
import {RenameCartDTO} from '../../application/dtos/RenameCartDTO';
import {IRemoveItem} from '../../application/interfaces/IRemoveItem';
import {RemoveUserFromCartDTO} from '../../application/dtos/RemoveUserFromCartDTO';

export class CartController {
  constructor(private createCartUseCase: ICreateCartUseCase,
              private addItemToCartUseCase: IAddItemToCartUseCase,
              private updateItemDoneStatus: IUpdateCartItemDoneStatus,
              private getCartListUseCase: IGetCartListUseCase,
              private deleteCartUseCase: IDeleteCartUseCase,
              private addUserToCartUseCase: IAddUserToCartUseCase,
              private renameCartUseCase: IRenameCartUseCase,
              private removeUserFromCart: IRemoveUserFromCart,
              private removeItem: IRemoveItem) {}

  public getCarts: Function[] = [
    validateToken,
    async (req: Request, res: Response) => {
      const {userId} = req;
      try {
        const createdResult = await this.getCartListUseCase.execute(userId);

        return res.status(200).json(createdResult);
      } catch (error) {
        console.log(error)
        res.status(500).json({message: `An error occurred while getting the carts`});
      }
    }
  ];

  public createCart: Function[] = [
    validateToken,
    validateRequest(CreateCartDTO),
    async (req: Request<null, null, CreateCartDTO>, res: Response) => {
      const {userId} = req;
      const {name} = req.body;

      try {
        const createdResult = await this.createCartUseCase.execute(name, userId);

        return res.status(201).json(createdResult);
      } catch (error) {
        res.status(500).json({message: `An error occurred while creating cart`});
      }
    }
  ];

  public deleteCart: Function[] = [
    validateToken,
    async (req: Request<{id}, null, null>, res: Response) => {
      const {userId} = req;
      const {id} = req.params;

      try {
        const createdResult = await this.deleteCartUseCase.execute(userId, id);

        return res.status(200).json(createdResult);
      } catch (error) {
        console.log('error', error)
        res.status(500).json({message: `An error occurred while deleting cart`});
      }
    }
  ]

  public addItemToCart: Function[] = [
    validateToken,
    validateRequest(AddItemToCartDTO),
    async (req: Request<null, null, AddItemToCartDTO>, res: Response) => {
      const {cartId, name} = req.body;
      try {
        const createdResult = await this.addItemToCartUseCase.execute(name, cartId);
        return res.status(201).json(createdResult);
      } catch (error) {
        console.log('error', error)
        res.status(500).json({message: `An error occurred while creating cart item`});
      }
    }
  ];

  public updateCartItemDoneStatus: Function[] = [
    validateToken,
    validateRequest(UpdateItemActiveStatusDTO),
    async (req: Request<{id: string}, null, UpdateItemActiveStatusDTO>, res: Response) => {
      const {status} = req.body;
      const cartItemId = +req.params.id;
      try {
        const updatedResult = await this.updateItemDoneStatus.execute(cartItemId, status);
        return res.status(200).json(updatedResult);
      } catch (error) {
        res.status(500).json({message: `An error occurred while updating cart item`});
      }
    }
  ];

  public addUserToCart: Function[] = [
    validateToken,
    validateRequest(AddUserToCartDTO),
    async (req: Request<null, null, AddUserToCartDTO>, res: Response) => {
      const {email, cartId} = req.body;

      try {
        const updatedResult = await this.addUserToCartUseCase.execute(email, cartId);
        return res.status(200).json(updatedResult);
      } catch (error) {
        res.status(500).json({message: error.message ?? `An error occurred while adding user to the cart`});
      }
    }
  ]

  public removeUserFromCart: Function[] = [
    validateToken,
    validateRequest(RemoveUserFromCartDTO),
    async (req: Request<null, null, RemoveUserFromCartDTO>, res: Response) => {
      const {userId, cartId} = req.body;

      try {
        const updatedResult = await this.removeUserFromCart.execute(userId, cartId);
        return res.status(200).json(updatedResult);
      } catch (error) {
        res.status(500).json({message: `An error occurred while removing user from cart`});
      }
    }
  ]

  public renameCart: Function[] = [
    validateToken,
    validateRequest(RenameCartDTO),
    async (req: Request<{id: string}, null, RenameCartDTO>, res: Response) => {
      const {userId} = req;
      const {id} = req.params;
      const {name} = req.body;
      try {
        const updatedResult = await this.renameCartUseCase.execute(+id, name, userId);
        return res.status(200).json(updatedResult);
      } catch (error) {
        console.log(error)
        res.status(500).json({message: `An error occurred - rename cart`});
      }
    }
  ];

  public removeItemFromCart: Function[] = [
    validateToken,
    async (req: Request<{id: string}, null, null>, res: Response) => {
      const {userId} = req;
      const {id} = req.params;

      try {
        const updatedResult = await this.removeItem.execute(+id, userId);
        return res.status(200).json(updatedResult);
      } catch (error) {
        console.log(error)
        res.status(500).json({message: `An error occurred while removing item from cart`});
      }
    }
  ];
}
