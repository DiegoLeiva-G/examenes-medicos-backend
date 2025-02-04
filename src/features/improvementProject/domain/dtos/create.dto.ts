import { type ImprovementProjectEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { AppError } from '../../../../core';
import { createImprovementProjectSchema } from '../schemas';

interface IImprovementProject extends Omit<ImprovementProjectEntity, 'id'> {
  specificPladecoIds: string[];
}

interface IOptionalImprovementProject extends Partial<IImprovementProject> {}

export class CreateImprovementProjectDto implements CoreDto<CreateImprovementProjectDto> {
  private constructor(public readonly data: IOptionalImprovementProject) {
    this.validate(this);
  }

  public validate(dto: CreateImprovementProjectDto): void {
    const validationResult = createImprovementProjectSchema.safeParse(dto.data);

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
    return createImprovementProjectSchema.parse(this.data) as IImprovementProject;
  }

  public static create(object: IOptionalImprovementProject): CreateImprovementProjectDto {
    return new CreateImprovementProjectDto(object);
  }
}
