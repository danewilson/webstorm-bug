import { Cat } from './cat'
import { Dog } from './dog'

export class CatDog {
  constructor(readonly cat = new Cat(), readonly dog = new Dog()) {}
}
