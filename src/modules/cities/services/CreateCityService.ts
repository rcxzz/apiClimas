import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";

import City from "../typeorm/entities/City";

interface IRequest {
  nome: string;
  estado: string;
  pais: string;
  latitude: number;
  longitude: number;
}

export default class CreateCityService {
  public async execute({
    nome,
    estado,
    pais,
    latitude,
    longitude,
  }: IRequest): Promise<City> {

    const citiesRepository =
      AppDataSource.getRepository(City);

    const cityExists =
      await citiesRepository.findOne({
        where: { nome, estado },
      });

    if (cityExists) {
      throw new AppError(
        "There is already a city registered with this name in this state.",
      );
    }

    const city =
      citiesRepository.create({
        nome,
        estado,
        pais,
        latitude,
        longitude,
      });

    await citiesRepository.save(city);

    return city;
  }
}