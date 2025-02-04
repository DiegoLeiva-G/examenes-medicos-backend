import { type NextFunction, type Request, type Response } from 'express';
import { type AllInterfaceString, HttpCode, type SuccessResponse } from '../../../core';
import {
  CreateEmployee,
  CreateEmployeeDto,
  DeleteEmployee,
  type EmployeeEntity,
  type EmployeeEntityToList,
  type EmployeeRepository,
  GetEmployeeById,
  GetEmployeeByIdDto,
  GetEmployees,
  UpdateEmployee,
  UpdateEmployeeDto,
} from '../domain';
import { PaginationDto, type PaginationResponseEntity } from '../../_global';
import {
  CreatePerson,
  CreatePersonDto,
  GetPersonByDni,
  GetPersonByDniDto,
  type PersonEntity,
  type PersonRepository,
  UpdatePerson,
  UpdatePersonDto,
} from '../../person';
import { parseISOStringToDate, parseStringBoolean } from '../../../core/helpers';
import { type Gender, type StudyLevel } from '@prisma/client';

interface Params {
  id: string;
}

interface RequestBody
  extends Partial<AllInterfaceString<Omit<EmployeeEntity, 'id'>>>,
    Partial<AllInterfaceString<Omit<PersonEntity, 'id'>>> {}

interface RequestQuery {
  page: string;
  limit: string;
  search: string;
}

export class EmployeeController {
  //* Dependency injection
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly personRepository: PersonRepository,
  ) {}

  public getAll = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<EmployeeEntityToList[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const paginationDto = PaginationDto.create({ page: +page, limit: +limit, search });
    new GetEmployees(this.employeeRepository)
      .execute(paginationDto)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };

  public getById = (req: Request<Params>, res: Response<SuccessResponse<EmployeeEntity>>, next: NextFunction): void => {
    const { id } = req.params;
    const getEmployeeByIdDto = GetEmployeeByIdDto.create({ id });
    new GetEmployeeById(this.employeeRepository)
      .execute(getEmployeeByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public create = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<EmployeeEntity>>,
    next: NextFunction,
  ): void => {
    const {
      name,
      middleName,
      lastName,
      secondaryLastName,
      rut,
      birthdate,
      address,
      cityId,
      email,
      phone,
      enabled,
      gender,
      studyLevel,
      studyDescription,
    } = req.body;
    const createEmployee = (personId: string): void => {
      const createEmployeeDto = CreateEmployeeDto.create({
        phone,
        address,
        cityId,
        email,
        personId,
        studyLevel: studyLevel as StudyLevel,
        studyDescription,
        enabled: parseStringBoolean(enabled),
      });

      new CreateEmployee(this.employeeRepository)
        .execute(createEmployeeDto)
        .then(result => res.status(HttpCode.CREATED).json({ data: result }))
        .catch(next);
    };

    const getPersonByDniDto = GetPersonByDniDto.create({ rut: rut ?? '' });

    new GetPersonByDni(this.personRepository)
      .execute(getPersonByDniDto)
      .then(getPersonResult => {
        if (!getPersonResult?.id) {
          const createPersonDto = CreatePersonDto.create({
            name,
            rut,
            lastName,
            secondaryLastName,
            middleName,
            birthdate: parseISOStringToDate(birthdate),
            gender: gender as Gender,
          });

          new CreatePerson(this.personRepository)
            .execute(createPersonDto)
            .then(createPersonResult => {
              createEmployee(createPersonResult.id);
            })
            .catch(next);

          return;
        }

        createEmployee(getPersonResult.id);
      })
      .catch(next);
  };

  public update = (
    req: Request<Params, unknown, RequestBody>,
    res: Response<SuccessResponse<EmployeeEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const {
      name,
      middleName,
      lastName,
      secondaryLastName,
      birthdate,
      address,
      cityId,
      email,
      phone,
      enabled,
      gender,
      studyLevel,
      studyDescription,
    } = req.body;
    const updateEmployeeDto = UpdateEmployeeDto.create({
      id,
      phone,
      email,
      address,
      cityId,
      studyLevel: studyLevel as StudyLevel,
      studyDescription,
      enabled: parseStringBoolean(enabled),
    });

    new UpdateEmployee(this.employeeRepository)
      .execute(updateEmployeeDto)
      .then(result => {
        const updatePersonDto = UpdatePersonDto.create({
          id: result.personId ?? '',
          name,
          gender: gender as Gender,
          lastName,
          secondaryLastName,
          middleName,
          birthdate: parseISOStringToDate(birthdate),
        });

        new UpdatePerson(this.personRepository)
          .execute(updatePersonDto)
          .then(() => res.json({ data: result }))
          .catch(next);
      })
      .catch(next);
  };

  public delete = (req: Request<Params>, res: Response<SuccessResponse<EmployeeEntity>>, next: NextFunction): void => {
    const { id } = req.params;
    const getEmployeeByIdDto = GetEmployeeByIdDto.create({ id });

    new DeleteEmployee(this.employeeRepository)
      .execute(getEmployeeByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };
}
