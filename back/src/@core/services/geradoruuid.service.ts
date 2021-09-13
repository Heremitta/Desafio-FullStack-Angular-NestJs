import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class GeradorUuidService {
  //create ID's with pattern UUID4
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  }

  async createUuid(entity) {
    let uuid;
    let jaExisteID = undefined;
    do {
      uuid = this.uuidv4();
      jaExisteID = await entity.findOne({ where: { id: uuid } });
    } while (jaExisteID);
    return uuid;
  }

  async validateIfExists(entity, findBy: string, codigo, msgErro) {
    const jaExisteCnaeComEsseCodigoCnae = await entity.findOne({
      where: { [findBy]: codigo },
    });
    if (jaExisteCnaeComEsseCodigoCnae) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: msgErro,
        },
        HttpStatus.CONFLICT,
      );
    }
  }
}
