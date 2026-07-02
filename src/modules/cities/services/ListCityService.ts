import { AppDataSource } from "@shared/typeorm/data-source";
import City from "../typeorm/entities/City";

export default class ListCityService {
  public async execute(): Promise<City[]> {
    const citiesRepository = AppDataSource.getRepository(City);

   
    const cities = await citiesRepository.find({
      relations: {
        forecasts: true,
      },
    });

    return cities;
  }
}