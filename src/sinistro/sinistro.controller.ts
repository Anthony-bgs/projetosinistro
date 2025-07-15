import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { sinistro_service } from './sinistro.service';
import { sinistrodto } from './sinsitrodto';
import { sinistro } from './sinistro.interface';
import { get } from 'mongoose';

@Controller("sinistro")
export class sinistro_controller {
  constructor(private readonly appService: sinistro_service) { }

  @Post("/")
  async create(@Body() createsinistrodto: sinistrodto): Promise<sinistro> {
    return this.appService.create(createsinistrodto)
  }
  @Get("findAll")
  async findALL(): Promise<sinistro[]> {
    return this.appService.findAll()
  }
  @Get("find/:id")
  async findOne(@Param("id") id: string): Promise<sinistro | null> {
    return this.appService.find(id)
  }
  @Get("/ultimosmeses")
  async findvencimento(): Promise<sinistro[]> {
    return this.appService.find6meses()
  }
  @Get("/teste")
  async teste(): Promise<string> {
    return "conectado"
  }
}


