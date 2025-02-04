import type { UserEntity } from '../../../user';
import { type ImprovementProjectEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { editImprovementProjectSchema } from '../schemas';
import { AppError } from '../../../../core';

interface IImprovementProject extends Partial<Omit<ImprovementProjectEntity, 'id'>> {
  id: UserEntity['id'];
  specificPladecoIds?: string[];
}

export class UpdateImprovementProjectDto implements CoreDto<UpdateImprovementProjectDto> {
  private constructor(public readonly data: IImprovementProject) {
    this.validate(this);
  }

  public validate(dto: UpdateImprovementProjectDto): void {
    const validationResult = editImprovementProjectSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación del proyecto de mejoramiento',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public getValidatedData(): IImprovementProject {
    return editImprovementProjectSchema.parse(this.data) as IImprovementProject;
  }

  public static create(object: IImprovementProject): UpdateImprovementProjectDto {
    return new UpdateImprovementProjectDto(object);
  }
}
