import prisma from '../../../core/dbClient';
import { AppError } from '../../../core';
import {
  type CreateDepartmentDto,
  type GetDepartmentByIdDto,
  type DepartmentDatasource,
  DepartmentSummaryEntity,
  type UpdateDepartmentDto,
} from '../domain';

export class DepartmentDatasourceImpl implements DepartmentDatasource {
  public async getById(getByIdDto: GetDepartmentByIdDto): Promise<DepartmentSummaryEntity> {
    const { id } = getByIdDto.data;

    const department = await prisma.department.findUnique({
      select: {
        id: true,
        name: true,
        directorateCodeReference: true,
        description: true,
        subDepartmentId: true,
        enabled: true,
      },
      where: {
        id,
        archived: false,
      },
    });

    if (!department?.id) {
      throw AppError.notFound(`Departamento con id ${id} no existe`);
    }

    return DepartmentSummaryEntity.fromJson(department);
  }

  public async create(createDto: CreateDepartmentDto): Promise<DepartmentSummaryEntity> {
    const { name, directorateCodeReference, description, subDepartmentId, enabled } = createDto.getValidatedData();

    const createdDepartment = await prisma.department.create({
      data: {
        name,
        directorateCodeReference,
        description,
        subDepartmentId,
        enabled,
      },
    });

    return DepartmentSummaryEntity.fromJson(createdDepartment);
  }

  public async update(updateDto: UpdateDepartmentDto): Promise<DepartmentSummaryEntity> {
    const { id } = await this.getById(updateDto);
    const { name, directorateCodeReference, description, subDepartmentId, enabled } = updateDto.getValidatedData();

    const updatedDepartment = await prisma.department.update({
      data: {
        name,
        directorateCodeReference,
        description,
        subDepartmentId,
        enabled,
      },
      where: {
        id,
      },
    });

    return DepartmentSummaryEntity.fromJson(updatedDepartment);
  }

  public async delete(getByIdDto: GetDepartmentByIdDto): Promise<DepartmentSummaryEntity> {
    const { id } = await this.getById(getByIdDto);

    const deletedDepartment = await prisma.department.update({
      data: {
        archived: true,
      },
      where: {
        id,
      },
    });

    return DepartmentSummaryEntity.fromJson(deletedDepartment);
  }
}
