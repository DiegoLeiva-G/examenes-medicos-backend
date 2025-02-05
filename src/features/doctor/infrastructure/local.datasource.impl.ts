import { type Prisma } from '@prisma/client';
import prisma from '../../../core/dbClient';
import { AppError } from '../../../core';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';
import {
  type CreateDoctorDto,
  type DeleteDoctorByIdDto,
  DoctorCreateResponseEntity,
  type DoctorDatasource,
  DoctorDeleteResponseEntity,
  DoctorGetAllResponseEntity,
  DoctorGetByIdResponseEntity,
  DoctorUpdateResponseEntity,
  type GetDoctorByIdDto,
  type UpdateDoctorDto,
} from '../domain';

export class DoctorDatasourceImpl implements DoctorDatasource {
  public async getAllDoctors(
    pagination: PaginationDto,
  ): Promise<PaginationResponseEntity<DoctorGetAllResponseEntity[]>> {
    const { page, limit, search } = pagination;

    const where: Prisma.DoctorWhereInput = {
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

    const [totalDoctors, doctors] = await prisma.$transaction([
      prisma.doctor.count({ where }),
      prisma.doctor.findMany({
        select: {
          id: true,
          name: true,
          middleName: true,
          lastName: true,
          secondaryLastName: true,
          nameProfession: true,
          specialization: true,
          medicalExamination: true,
          createdAt: true,
        },
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(totalDoctors / limit);

    return {
      results: doctors.map(doctor => DoctorGetAllResponseEntity.fromJson(doctor)),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalDoctors,
      totalPages,
    };
  }

  public async getDoctorById(getByIdDto: GetDoctorByIdDto): Promise<DoctorGetByIdResponseEntity> {
    const { id } = getByIdDto.data;

    const doctor = await prisma.doctor.findUnique({
      select: {
        id: true,
        name: true,
        middleName: true,
        lastName: true,
        secondaryLastName: true,
        nameProfession: true,
        specialization: true,
        medicalExamination: true,
        createdAt: true,
      },
      where: {
        id,
        deleted: false,
      },
    });

    if (!doctor?.id) {
      throw AppError.notFound(`Doctor con id ${id} no existe`);
    }

    return DoctorGetByIdResponseEntity.fromJson(doctor);
  }

  public async deleteDoctor(getByIdDto: DeleteDoctorByIdDto): Promise<DoctorDeleteResponseEntity> {
    const { id } = await this.getDoctorById(getByIdDto);

    const deletedDoctor = await prisma.doctor.update({
      data: {
        deleted: true,
      },
      where: {
        id,
      },
    });

    return DoctorDeleteResponseEntity.fromJson(deletedDoctor);
  }

  public async createDoctor(createDto: CreateDoctorDto): Promise<DoctorCreateResponseEntity> {
    const { name, middleName, lastName, secondaryLastName, nameProfession, specialization } =
      createDto.getValidatedData();

    const createdDoctor = await prisma.doctor.create({
      data: {
        name,
        middleName,
        lastName,
        secondaryLastName,
        nameProfession,
        specialization,
      },
    });

    return DoctorCreateResponseEntity.fromJson(createdDoctor);
  }

  public async updateDoctor(updateDto: UpdateDoctorDto): Promise<DoctorUpdateResponseEntity> {
    const { name, middleName, lastName, secondaryLastName, nameProfession, specialization, id } =
      updateDto.getValidatedData();

    const updatedDoctor = await prisma.doctor.update({
      data: {
        name,
        middleName,
        lastName,
        secondaryLastName,
        nameProfession,
        specialization,
      },
      where: {
        id,
      },
    });

    return DoctorUpdateResponseEntity.fromJson(updatedDoctor);
  }
}
