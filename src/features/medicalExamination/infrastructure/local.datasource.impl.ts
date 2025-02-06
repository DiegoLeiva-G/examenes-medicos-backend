import { type Prisma } from '@prisma/client';
import prisma from '../../../core/dbClient';
import { AppError } from '../../../core';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';
import {
  type CreateMedicalExaminationDto,
  type DeleteMedicalExaminationByIdDto,
  MedicalExaminationCreateResponseEntity,
  type MedicalExaminationDatasource,
  MedicalExaminationDeleteResponseEntity,
  MedicalExaminationGetAllResponseEntity,
  MedicalExaminationGetByIdResponseEntity,
  MedicalExaminationUpdateResponseEntity,
  type GetMedicalExaminationByIdDto,
  type UpdateMedicalExaminationDto,
} from '../domain';
import type { MedicalExaminationTypeEntity } from '../../medicalExaminationType';

export class MedicalExaminationDatasourceImpl implements MedicalExaminationDatasource {
  public async getAllMedicalExaminations(
    pagination: PaginationDto,
    type: Array<MedicalExaminationTypeEntity['type']>,
  ): Promise<PaginationResponseEntity<MedicalExaminationGetAllResponseEntity[]>> {
    const { page, limit } = pagination;

    let typesTracking = {};

    if (type.length !== 0) {
      typesTracking = {
        type: {
          in: type.filter(item => item !== null),
        },
      };
    }

    const where: Prisma.MedicalExaminationWhereInput = {
      deleted: false,
      ...typesTracking,
    };

    const [totalMedicalExaminations, medicalExaminations] = await prisma.$transaction([
      prisma.medicalExamination.count({ where }),
      prisma.medicalExamination.findMany({
        select: {
          id: true,
          dateExam: true,
          observation: true,
          anexes: true,
          conclusion: true,
          titleDimension: true,
          nameDimension: true,
          measureDimension: true,
          descriptionDimension: true,
          medicalPatient: {
            select: {
              id: true,
              name: true,
              lastName: true,
              rut: true,
              middleName: true,
              secondaryLastName: true,
            },
          },
          doctor: {
            select: {
              id: true,
              name: true,
              lastName: true,
              middleName: true,
              secondaryLastName: true,
              nameProfession: true,
              specialization: true,
            },
          },
          medicalExaminationType: {
            select: {
              id: true,
              name: true,
              type: true,
            },
          },
          createdAt: true,
        },
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(totalMedicalExaminations / limit);

    return {
      results: medicalExaminations.map(medicalExamination =>
        MedicalExaminationGetAllResponseEntity.fromJson(medicalExamination),
      ),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalMedicalExaminations,
      totalPages,
    };
  }

  public async getMedicalExaminationById(
    getByIdDto: GetMedicalExaminationByIdDto,
  ): Promise<MedicalExaminationGetByIdResponseEntity> {
    const { id } = getByIdDto.data;

    const medicalExamination = await prisma.medicalExamination.findUnique({
      select: {
        id: true,
        dateExam: true,
        observation: true,
        anexes: true,
        conclusion: true,
        titleDimension: true,
        nameDimension: true,
        measureDimension: true,
        descriptionDimension: true,
        medicalPatient: {
          select: {
            id: true,
            name: true,
            lastName: true,
            rut: true,
            middleName: true,
            secondaryLastName: true,
          },
        },
        doctor: {
          select: {
            id: true,
            name: true,
            lastName: true,
            middleName: true,
            secondaryLastName: true,
            nameProfession: true,
            specialization: true,
          },
        },
        medicalExaminationType: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        createdAt: true,
      },
      where: {
        id,
        deleted: false,
      },
    });

    if (!medicalExamination?.id) {
      throw AppError.notFound(`MedicalExamination con id ${id} no existe`);
    }

    return MedicalExaminationGetByIdResponseEntity.fromJson(medicalExamination);
  }

  public async deleteMedicalExamination(
    getByIdDto: DeleteMedicalExaminationByIdDto,
  ): Promise<MedicalExaminationDeleteResponseEntity> {
    const { id } = await this.getMedicalExaminationById(getByIdDto);

    const deletedMedicalExamination = await prisma.medicalExamination.update({
      data: {
        deleted: true,
      },
      where: {
        id,
      },
    });

    return MedicalExaminationDeleteResponseEntity.fromJson(deletedMedicalExamination);
  }

  public async createMedicalExamination(
    createDto: CreateMedicalExaminationDto,
  ): Promise<MedicalExaminationCreateResponseEntity> {
    const {
      dateExam,
      observation,
      anexes,
      conclusion,
      titleDimension,
      nameDimension,
      measureDimension,
      descriptionDimension,
      medicalPatientId,
      doctorId,
      medicalExaminationTypeId,
      createdAt,
    } = createDto.getValidatedData();

    const createdMedicalExamination = await prisma.medicalExamination.create({
      data: {
        dateExam,
        observation,
        anexes,
        conclusion,
        titleDimension,
        nameDimension,
        measureDimension,
        descriptionDimension,
        medicalPatientId,
        doctorId,
        medicalExaminationTypeId,
        createdAt,
      },
    });

    return MedicalExaminationCreateResponseEntity.fromJson(createdMedicalExamination);
  }

  public async updateMedicalExamination(
    updateDto: UpdateMedicalExaminationDto,
  ): Promise<MedicalExaminationUpdateResponseEntity> {
    const {
      id,
      dateExam,
      observation,
      anexes,
      conclusion,
      titleDimension,
      nameDimension,
      measureDimension,
      descriptionDimension,
      medicalPatientId,
      doctorId,
      medicalExaminationTypeId,
    } = updateDto.getValidatedData();

    const updatedMedicalExamination = await prisma.medicalExamination.update({
      data: {
        dateExam,
        observation,
        anexes,
        conclusion,
        titleDimension,
        nameDimension,
        measureDimension,
        descriptionDimension,
        medicalPatientId,
        doctorId,
        medicalExaminationTypeId,
      },
      where: {
        id,
      },
    });

    return MedicalExaminationUpdateResponseEntity.fromJson(updatedMedicalExamination);
  }
}
