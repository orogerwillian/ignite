import {ICreateSpecificationDTO, ISpecificationsRepository} from "../ISpecificationsRepository";
import {Specification} from "../../entities/Specification";
import {getRepository, Repository} from "typeorm";

class SpecificationsRepository implements ISpecificationsRepository {

    private repository: Repository<Specification>

    constructor() {
        this.repository = getRepository(Specification)
    }

    async create({name, description}: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            name,
            description
        });

        await this.repository.save(specification);
    }

    async findByName(name: string): Promise<Specification> {
        return this.repository.findOne({name})
    }
}

export {SpecificationsRepository};
