import { type Prisma } from '@prisma/client';
import prisma from '../../../core/dbClient';
import { AppError } from '../../../core';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';
import {
  type CreateMedicalPatientDto,
  type DeleteMedicalPatientByIdDto,
  MedicalPatientCreateResponseEntity,
  type MedicalPatientDatasource,
  MedicalPatientDeleteResponseEntity,
  MedicalPatientGetAllResponseEntity,
  MedicalPatientGetByIdResponseEntity,
  MedicalPatientUpdateResponseEntity,
  type GetMedicalPatientByIdDto,
  type UpdateMedicalPatientDto,
} from '../domain';

export class MedicalPatientDatasourceImpl implements MedicalPatientDatasource {
  public async getAllMedicalPatients(
    pagination: PaginationDto,
  ): Promise<PaginationResponseEntity<MedicalPatientGetAllResponseEntity[]>> {
    const { page, limit, search } = pagination;

    const where: Prisma.MedicalPatientWhereInput = {
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

    const [totalMedicalPatients, medicalPatients] = await prisma.$transaction([
      prisma.medicalPatient.count({ where }),
      prisma.medicalPatient.findMany({
        select: {
          id: true,
          rut: true,
          name: true,
          middleName: true,
          lastName: true,
          secondaryLastName: true,
          medicalExamination: true,
          createdAt: true,
        },
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(totalMedicalPatients / limit);

    return {
      results: medicalPatients.map(medicalPatient => MedicalPatientGetAllResponseEntity.fromJson(medicalPatient)),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalMedicalPatients,
      totalPages,
    };
  }

  public async getMedicalPatientById(
    getByIdDto: GetMedicalPatientByIdDto,
  ): Promise<MedicalPatientGetByIdResponseEntity> {
    const { id } = getByIdDto.data;

    const medicalPatient = await prisma.medicalPatient.findUnique({
      select: {
        id: true,
        rut: true,
        name: true,
        middleName: true,
        lastName: true,
        secondaryLastName: true,
        medicalExamination: true,
        createdAt: true,
      },
      where: {
        id,
        deleted: false,
      },
    });

    if (!medicalPatient?.id) {
      throw AppError.notFound(`MedicalPatient con id ${id} no existe`);
    }

    return MedicalPatientGetByIdResponseEntity.fromJson(medicalPatient);
  }

  public async deleteMedicalPatient(
    getByIdDto: DeleteMedicalPatientByIdDto,
  ): Promise<MedicalPatientDeleteResponseEntity> {
    const { id } = await this.getMedicalPatientById(getByIdDto);

    const deletedMedicalPatient = await prisma.medicalPatient.update({
      data: {
        deleted: true,
      },
      where: {
        id,
      },
    });

    return MedicalPatientDeleteResponseEntity.fromJson(deletedMedicalPatient);
  }

  public async createMedicalPatient(createDto: CreateMedicalPatientDto): Promise<MedicalPatientCreateResponseEntity> {
    const { rut, name, middleName, lastName, secondaryLastName } = createDto.getValidatedData();

    const createdMedicalPatient = await prisma.medicalPatient.create({
      data: {
        rut,
        name,
        middleName,
        lastName,
        secondaryLastName,
      },
    });

    return MedicalPatientCreateResponseEntity.fromJson(createdMedicalPatient);
  }

  public async updateMedicalPatient(updateDto: UpdateMedicalPatientDto): Promise<MedicalPatientUpdateResponseEntity> {
    const { rut, name, middleName, lastName, secondaryLastName, id } = updateDto.getValidatedData();

    const updatedMedicalPatient = await prisma.medicalPatient.update({
      data: {
        rut,
        name,
        middleName,
        lastName,
        secondaryLastName,
      },
      where: {
        id,
      },
    });

    return MedicalPatientUpdateResponseEntity.fromJson(updatedMedicalPatient);
  }
}
