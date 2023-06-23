import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;
    let message: string;
    switch(exception.code){
      case 'P2000':
        message = `The provided value for the column is too long for the column's type. Column :${exception.meta.column_name}`;
        break;
      case "P2001":
        message = `The record searched for in the where conditions (${exception.meta.model_name}.${exception.meta.argument_name} = ${exception.meta.argument_value}) does not exist`;
        break;
      case "P2002":
        message = `Unique constraint failed on the ${exception.meta.target}`;
        break;
      case "P2003":
        message = `Foreign key constaint failed on the field: ${exception.meta.field_name}`;
        break;
      case "P2004":
        message = `A constraint failed on the database: ${exception.meta.database_error}`;
        break;
      case "P2005":
        message = `The value ${exception.meta.field_value} stored in the database for the ${exception.meta.field_name} is invalid for the field's type`;
        break;
      case "P2006":
        message = `The provided value ${exception.meta.field_value} for ${exception.meta.model_name} field ${exception.meta.field_name} is not valid`;
        break;
      case "P2007":
        message = `Data validation error ${exception.meta.database_error}`;
        break;
      case "P2008":
        message = `Failed to parse the query ${exception.meta.query_parsing_error} at ${exception.meta.query_position}`;
        break;
      case "P2009":
        message = `Failed to validate the query: ${exception.meta.query_validation_error} at ${exception.meta.query_position}`;
        break;
      case "P2010":
        message = `Raw query failed. Code: ${exception.meta.code}. Message: ${exception.meta.message}`;
        break;
      case "P2011":
        message = `Null constraint violation on the ${exception.meta.constraint}`;
        break;
      case "P2012":
        message = `Missing a required value at ${exception.meta.path}`;
        break;
      case "P2013":
        message = `Missing the required argument ${exception.meta.argument_name} for field ${exception.meta.field_name} on ${exception.meta.object_name}.`;
        break;
      case "P2014":
        message = `The change you are trying to make would violate the required relation '${exception.meta.relation_name}' between the ${exception.meta.model_a_name} and ${exception.meta.model_b_name} models.`;
        break;
      case "P2015":
        message = `A related record could not be found. ${exception.meta.details}`;
        break;
      case "P2016":
        message = `Query interpretation error. ${exception.meta.details}`;
        break;
      case "P2017":
        message= `The records for relation ${exception.meta.relation_name} between the ${exception.meta.parent_name} and ${exception.meta.child_name} models are not connected.`;
        break;
      case "P2018":
        message = `The required connected records were not found. ${exception.meta.details}`;
        break;
      case "P2019":
        message = `Input error. ${exception.meta.details}`;
        break;
      case "P2020":
        message = `Value out of range for the type. ${exception.meta.details}`;
        break;
      case "P2021":
        message = `The table ${exception.meta.table} does not exist in the current database.`;
        break;
      case "P2022":
        message = `The column ${exception.meta.column} does not exist in the current database.`;
        break;
      case "P2023":
        message = `Inconsistent column data: ${exception.meta.message}`;
        break;
      case "P2024":
        message = `Timed out fetching a new connection from the connection pool. (More info: http://pris.ly/d/connection-pool (Current connection pool timeout: ${exception.meta.timeout}, connection limit: ${exception.meta.connection_limit})`;
        break;
      case "P2025":
        message = `An operation failed because it depends on one or more records that were required but not found. ${exception.meta.cause}`;
        break;
      case "P2026":
        message = `The current database provider doesn't support a feature that the query used: ${exception.meta.feature}`;
        break;
      case "P2027":
        message = `Multiple errors occurred on the database during query execution: ${exception.meta.errors}`
        break;
      case "P2028":
        message = `Transaction API error: ${exception.meta.error}`;
        break;
      case "P2030":
        message = `Cannot find a fulltext index to use for the search, try adding a @@fulltext([Fields...]) to your schema`;
        break;
      case "P2031":
        message = `Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set. See details: https://pris.ly/d/mongodb-replica-set`
        break;
      case "P2032":
        message = `A number used in the query does not fit into a 64 bit signed integer. Consider using BigInt as field type if you're trying to store large integers`;
        break;
      case "P2034":
        message = `Transaction failed due to a write conflict or a deadlock. Please retry your transaction`;
        break;
      default: message = "I don't know !"
    }

    response.status(status).json({
      statusCode: status,
      message: message
    });
  }
}
