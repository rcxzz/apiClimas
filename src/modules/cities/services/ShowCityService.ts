import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import City from "../typeorm/entities/City";

interface IRequest {
  id: string;
}

export default class ShowCityService {
  public async execute({ id }: IRequest): Promise<City> {
    const citiesRepository = AppDataSource.getRepository(City);

    const city = await citiesRepository.findOne({
      where: { id },
      relations: {
        forecasts: true,
      },
    });

    if (!city) {
      throw new AppError("City not found.");
    }

    return city;
  }
}