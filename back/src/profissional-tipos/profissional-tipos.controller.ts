import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfissionalTiposService } from './profissional-tipos.service';
import { CreateProfissionalTipoDto } from './dto/create-profissional-tipo.dto';
import { UpdateProfissionalTipoDto } from './dto/update-profissional-tipo.dto';

@Controller('profissional-tipos')
export class ProfissionalTiposController {
  constructor(
    private readonly profissionalTiposService: ProfissionalTiposService,
  ) {}

  @Post()
  create(@Body() createProfissionalTipoDto: CreateProfissionalTipoDto) {
    return this.profissionalTiposService.create(createProfissionalTipoDto);
  }

  @Get()
  findAll() {
    return this.profissionalTiposService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profissionalTiposService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfissionalTipoDto: UpdateProfissionalTipoDto,
  ) {
    return this.profissionalTiposService.update(id, updateProfissionalTipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profissionalTiposService.remove(id);
  }
}
