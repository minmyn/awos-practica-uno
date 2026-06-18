import { type Request, type Response, type NextFunction } from 'express';
import { UserService } from './user.service.js';
import { BadRequestError } from '../../infra/errors/specific.errors.js';
import type { UserResponseDto } from './dtos/user.response.js';

export class UserController {
  constructor(private userService: UserService) {}

  getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const supplierId = req.query.supplierId as string;

      let data: UserResponseDto[] = await this.userService.getAllUsers();

      const total = data.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      
      const paginatedData = data.slice(startIndex, endIndex);

      res.status(200).json({
        data: paginatedData,
        meta: {
          page,
          limit,
          total,
          totalPages
        }
      });
    } catch (error) {
      next(error);
    }
  };

  // Mantenemos tu obtención por Path Parameter que configuramos antes
  getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id || id === ':id' || id === 'undefined') {
        throw new BadRequestError(
          'La estructura de la petición contiene errores de sintaxis o parámetros ausentes.',
          {
            invalidQueryParam: 'id',
            expectedType: 'string/UUID',
            receivedValue: id
          }
        );
      }

      const profile = await this.userService.getUserProfile(id);
      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  };
}