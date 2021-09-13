import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';
@Table({ tableName: 'profissional-tipos' })
export class ProfissionalTipo extends Model {
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
  descricao: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  situacao: boolean;
}
