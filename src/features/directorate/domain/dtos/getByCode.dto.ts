import { type DirectorateEntity } from '../entities';
import { type CoreDto, directorateCodeSchema } from '../../../_global';
import { AppError } from '../../../../core';

export class GetDirectorateByCodeDto implements CoreDto<GetDirectorateByCodeDto> {
  private constructor(public readonly data: Pick<DirectorateEntity, 'Codigo_Direccion'>) {
    this.validate(this);
  }

  public validate(dto: GetDirectorateByCodeDto): void {
    const validationResult = directorateCodeSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación de la dirección',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public static create(object: Pick<DirectorateEntity, 'Codigo_Direccion'>): GetDirectorateByCodeDto {
    return new GetDirectorateByCodeDto(object);
  }
}
