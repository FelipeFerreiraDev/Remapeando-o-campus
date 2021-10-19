import { Request, Response } from "express";

import { getRepository } from "typeorm";

import rooms from "../models/Rooms";

import roomView from '../views/room_view';

import * as Yup from 'yup'

export default {

    // Exibe Todos as salas
    async index(request: Request, response: Response) {
        const roomsRepository = getRepository(rooms);

        const room = await roomsRepository.find({
            relations: ['images']
        });

        return response.json(roomView.renderMany(room));
    },


    // Exibe uma sala específica
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const roomsRepository = getRepository(rooms);

        const room = await roomsRepository.findOneOrFail(id,
            {
                relations: ['images']
            });

        return response.json(roomView.render(room));
    },


    // Cria uma sala
    async create(request: Request, response: Response) {
        const {
            name,
            nameShow,
            campus,
            type,
            latitude,
            longitude,
            description,
            link,
            piso
        } = request.body;

        /*name.toLowerCase()
        campus.toLowerCase();*/

        const roomsRepository = getRepository(rooms);

        const requestImages = request.files as Express.Multer.File[];

        const images = requestImages?.map(image => {
            return { path: image.filename }
        })

        const data = {
            name : name.toLowerCase(),
            nameShow,
            campus : campus.toLowerCase(),
            type,
            latitude,
            longitude,
            description,
            images,
            link,
            piso
        }

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            nameShow: Yup.string().required('Nome obrigatório'),
            campus: Yup.string().required('Nome do campus obrigatório'),
            piso: Yup.string().required('Piso da sala obrigatório'),
            type: Yup.string().required('Tipo de sala obrigatório'),
            latitude: Yup.number().required('Latitude da sala obrigatória'),
            longitude: Yup.number().required('Longitude da sala obrigatória'),
            description: Yup.string().required('Descrição obrigatória').max(300),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required('Imagem inválida')
            }))
        });

        await schema.validate(data, {
            abortEarly: false,
        })

        const room = roomsRepository.create(data);

        await roomsRepository.save(room);

        return response.status(201).json(room);
    },


    // Deleta uma Sala
    async delete(request: Request, response: Response) {
        const { campus, name } = request.params;

        const roomsRepository = getRepository(rooms);

        const room = (await roomsRepository.find({ relations: ['images'] }));
        let index = 0;
        for (var key in room) {
            if(room[key].name === name && room[key].campus === campus){
                index += 1;
                await roomsRepository.delete(room[key].id);
                const obj = {
                    status: 'Sala deletada com sucesso!'
                }
                return response.json(JSON.stringify(obj['status']));
            }
        }

        if(index === 0){
            const obj = {
                status: 'Não encontramos nenhuma sala com este nome!'
            }
            return response.json(JSON.stringify(obj['status']))
        }
    },


    // Atualiza uma sala
    async update(request: Request, response: Response) {
        const { id } = request.params;

        const roomsRepository = getRepository(rooms);

        const {
            name,
            campus,
            latitude,
            longitude,
            description
        } = request.body;

        await roomsRepository.update(id, {
            name,
            campus,
            latitude,
            longitude,
            description,
        });

        const room = await roomsRepository.find();

        return response.status(201).json(room);
    },


    async showListRoom(request: Request, response: Response) {
        const { campus, name } = request.params;


        const roomsRepository = getRepository(rooms);

        const room = (await roomsRepository.find({ relations: ['images'] })).filter(a => a.name.startsWith(name) && a.campus === campus);

        return response.json(roomView.renderMany(room));
    },
}