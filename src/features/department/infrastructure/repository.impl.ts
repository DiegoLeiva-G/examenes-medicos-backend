import {
  type CreateDepartmentDto,
  type GetDepartmentByIdDto,
  type DepartmentDatasource,
  type DepartmentSummaryEntity,
  type DepartmentRepository,
  type UpdateDepartmentDto,
} from '../domain';

export class DepartmentRepositoryImpl implements DepartmentRepository {
  constructor(private readonly datasource: DepartmentDatasource) {}

  async create(createDto: CreateDepartmentDto): Promise<DepartmentSummaryEntity> {
    return await this.datasource.create(createDto);
  }

  async getById(getByIdDto: GetDepartmentByIdDto): Promise<DepartmentSummaryEntity> {
    return await this.datasource.getById(getByIdDto);
  }

  async update(updateDto: UpdateDepartmentDto): Promise<DepartmentSummaryEntity> {
    return await this.datasource.update(updateDto);
  }

  async delete(getByIdDto: GetDepartmentByIdDto): Promise<DepartmentSummaryEntity> {
    return await this.datasource.delete(getByIdDto);
  }
}
