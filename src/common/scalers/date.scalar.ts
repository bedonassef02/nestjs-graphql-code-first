import { CustomScalar, Scalar } from '@nestjs/graphql';
import {
  GraphQLScalarValueParser,
  GraphQLScalarSerializer,
  GraphQLScalarLiteralParser,
  Kind,
  ValueNode,
} from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description?: string = 'Date custom scalar type';

  parseValue(value: Date): Date {
    return new Date(value);
  }

  serialize(value: Date): number {
    console.log(`serializing ${value}`);
    return value.getTime();
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}
