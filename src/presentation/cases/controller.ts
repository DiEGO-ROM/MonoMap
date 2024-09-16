import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { CaseModel }from "../../data/models/case.model"

export class CaseController {
  public getAll = async(req: Request, res: Response)=>{
    try{
      const cases = await CaseModel.find()
      res.json(cases).status(StatusCodes.OK)
    }catch(error){
      res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }

  public deleteCase = async(req: Request, res: Response)=>{
    try{
      const {id} = req.params
      const monoCase = await CaseModel.findById(id)
      if(!monoCase){
        res.json("Case not found").status(StatusCodes.NOT_FOUND)
      }
      await CaseModel.findByIdAndDelete(id)
      res.status(StatusCodes.OK).send()
    }catch(error){
      res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }

  public updateCase = async(req: Request, res: Response)=>{
    try{
      const monoCase = req.body
      const {id} = req.params
      const oldMonoCase = await CaseModel.findById(id)
      await CaseModel.findByIdAndUpdate(id, {
        ...monoCase,
        creationDate: oldMonoCase!.creationDate,
        isSent: false,
      })
      const updatedCase = await CaseModel.findById(id)
      res.json(updatedCase).status(StatusCodes.OK)
    }catch(error){
      res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }

  public getoneById = async(req: Request, res: Response)=>{
    try{
      const {id} = req.params
      const monoCase = await CaseModel.findById(id)
      res.json(monoCase).status(StatusCodes.OK)
    }catch(error){
      res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }

  public getLastWeek = async(req: Request, res: Response)=>{
    try{
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

      const cases = await CaseModel.find({
      creationDate: { $gte: oneWeekAgo }
      });
      res.json(cases).status(StatusCodes.OK)
    }catch(error){
      res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }

  public createCase = async(req: Request, res: Response)=>{
    try{
      const monoCase = req.body
      const insertionResponse = await CaseModel.create({
        age: monoCase.age,
        creationDate: new Date().toISOString(),
        genre: monoCase.genre,
        isSent: false,
        lat: monoCase.lat,
        lng: monoCase.lng,
      })
      res.json(insertionResponse).status(StatusCodes.OK)
    }catch(error){
      res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }

}