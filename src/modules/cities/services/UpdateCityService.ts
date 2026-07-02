import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import City from "../typeorm/entities/City";

interface IRequest {
  id: string;
  nome: string;
  estado: string;
  pais: string;
  latitude: number;
  longitude: number;
}

export default class UpdateCityService {
  public async execute({
    id,
    nome,
    estado,
    pais,
    latitude,
    longitude,
  }: IRequest): Promise<City> {
    const citiesRepository = AppDataSource.getRepository(City);

    const city = await citiesRepository.findOne({
      where: { id },
    });

    if (!city) {
      throw new AppError("City not found.");
    }

    city.nome = nome;
    city.estado = estado;
    city.pais = pais;
    city.latitude = latitude;
    city.longitude = longitude;

    await citiesRepository.save(city);

    return city;
  }
}