import { type Prisma } from '@prisma/client';
import prisma from '../../../core/dbClient';
import { AppError } from '../../../core';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';
import {
  type CreateMedicalExaminationTypeDto,
  type DeleteMedicalExaminationTypeByIdDto,
  MedicalExaminationTypeCreateResponseEntity,
  type MedicalExaminationTypeDatasource,
  MedicalExaminationTypeDeleteResponseEntity,
  MedicalExaminationTypeGetAllResponseEntity,
  MedicalExaminationTypeGetByIdResponseEntity,
  MedicalExaminationTypeUpdateResponseEntity,
  type GetMedicalExaminationTypeByIdDto,
  type UpdateMedicalExaminationTypeDto,
} from '../domain';

export class MedicalExaminationTypeDatasourceImpl implements MedicalExaminationTypeDatasource {
  public async getAllMedicalExaminationTypes(
    pagination: PaginationDto,
  ): Promise<PaginationResponseEntity<MedicalExaminationTypeGetAllResponseEntity[]>> {
    const { page, limit, search } = pagination;

    const where: Prisma.MedicalExaminationTypeWhereInput = {
      OR: [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
      deleted: false,
    };

    const [totalMedicalExaminationTypes, medicalExaminationTypes] = await prisma.$transaction([
      prisma.medicalExaminationType.count({ where }),
      prisma.medicalExaminationType.findMany({
        select: {
          id: true,
          name: true,
          type: true,
        },
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(totalMedicalExaminationTypes / limit);

    return {
      results: medicalExaminationTypes.map(medicalExaminationType =>
        MedicalExaminationTypeGetAllResponseEntity.fromJson(medicalExaminationType),
      ),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalMedicalExaminationTypes,
      totalPages,
    };
  }

  public async getMedicalExaminationTypeById(
    getByIdDto: GetMedicalExaminationTypeByIdDto,
  ): Promise<MedicalExaminationTypeGetByIdResponseEntity> {
    const { id } = getByIdDto.data;

    const medicalExaminationType = await prisma.medicalExaminationType.findUnique({
      select: {
        id: true,
        name: true,
        type: true,
      },
      where: {
        id,
        deleted: false,
      },
    });

    if (!medicalExaminationType?.id) {
      throw AppError.notFound(`MedicalExaminationType con id ${id} no existe`);
    }

    return MedicalExaminationTypeGetByIdResponseEntity.fromJson(medicalExaminationType);
  }

  public async deleteMedicalExaminationType(
    getByIdDto: DeleteMedicalExaminationTypeByIdDto,
  ): Promise<MedicalExaminationTypeDeleteResponseEntity> {
    const { id } = await this.getMedicalExaminationTypeById(getByIdDto);

    const deletedMedicalExaminationType = await prisma.medicalExaminationType.update({
      data: {
        deleted: true,
      },
      where: {
        id,
      },
    });

    return MedicalExaminationTypeDeleteResponseEntity.fromJson(deletedMedicalExaminationType);
  }

  public async createMedicalExaminationType(
    createDto: CreateMedicalExaminationTypeDto,
  ): Promise<MedicalExaminationTypeCreateResponseEntity> {
    const { name, type } = createDto.getValidatedData();

    const createdMedicalExaminationType = await prisma.medicalExaminationType.create({
      data: {
        name,
        type,
      },
    });

    return MedicalExaminationTypeCreateResponseEntity.fromJson(createdMedicalExaminationType);
  }

  public async updateMedicalExaminationType(
    updateDto: UpdateMedicalExaminationTypeDto,
  ): Promise<MedicalExaminationTypeUpdateResponseEntity> {
    const { id, name, type } = updateDto.getValidatedData();

    const updatedMedicalExaminationType = await prisma.medicalExaminationType.update({
      data: {
        name,
        type,
      },
      where: {
        id,
      },
    });

    return MedicalExaminationTypeUpdateResponseEntity.fromJson(updatedMedicalExaminationType);
  }
}
