import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import City from "../typeorm/entities/City";

interface IRequest {
  id: string;
}

export default class DeleteCityService {
  public async execute({ id }: IRequest): Promise<void> {
    const citiesRepository = AppDataSource.getRepository(City);

    const city = await citiesRepository.findOne({
      where: { id },
    });

    if (!city) {
      throw new AppError("City not found.");
    }

    await citiesRepository.remove(city);
  }
}