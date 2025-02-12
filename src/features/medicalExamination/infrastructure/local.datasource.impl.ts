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

export class MedicalExaminationDatasourceImpl implements MedicalExaminationDatasource {
  public async getAllMedicalExaminations(
    pagination: PaginationDto,
  ): Promise<PaginationResponseEntity<MedicalExaminationGetAllResponseEntity[]>> {
    const { page, limit } = pagination;

    const where: Prisma.MedicalExaminationWhereInput = {
      deleted: false,
    };

    const [totalMedicalExaminations, medicalExaminations] = await prisma.$transaction([
      prisma.medicalExamination.count({ where }),
      prisma.medicalExamination.findMany({
        select: {
          id: true,
          dateExam: true,
          observation: true,
          observation2: true,
          dimension: true,
          dimension2: true,
          descriptionDimension: true,
          anexes: true,
          anexes2: true,
          descriptionAnexes: true,
          conclusion: true,
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
        observation2: true,
        dimension: true,
        dimension2: true,
        descriptionDimension: true,
        anexes: true,
        anexes2: true,
        descriptionAnexes: true,
        conclusion: true,
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
      observation2,
      dimension,
      dimension2,
      descriptionDimension,
      anexes,
      anexes2,
      descriptionAnexes,
      conclusion,
      medicalPatientId,
      doctorId,
      medicalExaminationTypeId,
      createdAt,
    } = createDto.getValidatedData();

    const examinationType = await prisma.medicalExaminationType.findUnique({
      where: {
        id: medicalExaminationTypeId,
      },
    });

    if (!examinationType) {
      throw AppError.notFound(`Examination Type with ID ${medicalExaminationTypeId} not found`);
    }

    const createdMedicalExamination = await prisma.medicalExamination.create({
      data: {
        dateExam,
        observation,
        observation2,
        dimension,
        dimension2,
        descriptionDimension,
        anexes,
        anexes2,
        descriptionAnexes,
        conclusion,
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
      observation2,
      dimension,
      dimension2,
      descriptionDimension,
      anexes,
      anexes2,
      descriptionAnexes,
      conclusion,
      medicalPatientId,
      doctorId,
      medicalExaminationTypeId,
    } = updateDto.getValidatedData();

    const examinationType = await prisma.medicalExaminationType.findUnique({
      where: {
        id: medicalExaminationTypeId,
      },
    });

    if (!examinationType) {
      throw AppError.notFound(`Examination Type with ID ${medicalExaminationTypeId} not found`);
    }

    const updatedMedicalExamination = await prisma.medicalExamination.update({
      data: {
        dateExam,
        observation,
        observation2,
        dimension,
        dimension2,
        descriptionDimension,
        anexes,
        anexes2,
        descriptionAnexes,
        conclusion,
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
