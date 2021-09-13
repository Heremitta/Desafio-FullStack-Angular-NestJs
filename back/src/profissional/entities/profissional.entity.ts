import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ProfissionalTipo } from 'src/profissional-tipos/entities/profissional-tipo.entity';

@Table({ tableName: 'profissionais' })
export class Profissional extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  nome: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: true,
  })
  telefone: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  email: string;

  @ForeignKey(() => ProfissionalTipo)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    onDelete: 'cascade',
  })
  tipoDeProfissional: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  situacao: boolean;

  @BelongsTo(() => ProfissionalTipo)
  tipo: ProfissionalTipo;
}
