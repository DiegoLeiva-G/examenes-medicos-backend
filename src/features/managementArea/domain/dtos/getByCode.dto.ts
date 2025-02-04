import { type ManagementAreaEntity } from '../entities';
import { type CoreDto, managementAreaCodeSchema } from '../../../_global';
import { AppError } from '../../../../core';

export class GetManagementAreaByCodeDto implements CoreDto<GetManagementAreaByCodeDto> {
  private constructor(public readonly data: Pick<ManagementAreaEntity, 'Codigo_AreaGestion'>) {
    this.validate(this);
  }

  public validate(dto: GetManagementAreaByCodeDto): void {
    const validationResult = managementAreaCodeSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación de la área de gestión',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public static create(object: Pick<ManagementAreaEntity, 'Codigo_AreaGestion'>): GetManagementAreaByCodeDto {
    return new GetManagementAreaByCodeDto(object);
  }
}
