import { Logger, NotFoundException } from '@nestjs/common';
import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  SaveOptions,
  Connection,
} from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(
    protected readonly model: Model<TDocument>,
    private readonly connection: Connection,
  ) {}

  async create(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions,
  ): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (
      await createdDocument.save(options)
    ).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document as TDocument;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ):Promise <TDocument> {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document as TDocument;
  }

  async upsert(
  filterQuery: FilterQuery<TDocument>,
  document: Partial<TDocument>,
): Promise<TDocument> {
  const updated = await this.model.findOneAndUpdate(filterQuery, document, {
    lean: true,
    upsert: true,
    new: true,
  });

  if (!updated) {
    this.logger.warn('Document not found or failed to upsert:', filterQuery);
    throw new NotFoundException('Document not upserted.');
  }

  return updated as TDocument;
}

async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
  const documents = await this.model.find(filterQuery, {}, { lean: true });
  return documents as TDocument[];
}


  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}