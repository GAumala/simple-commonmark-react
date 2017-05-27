import { ReactElement } from 'react'

class Container {
  type: String
  element: ReactElement<any>

  constructor(type: string, element: ReactElement<any>) {
    this.type = type
    this.element = element
  }
}

export default class ContainerStack {
  private internalStack: Container[]

  constructor() {
    this.internalStack = []
  }

  pushContainer(type: string, element: ReactElement<any>) {
    this.internalStack.push(new Container(type, element))
  }

  removeContainer(type: string) {
    const length = this.internalStack.length
    if (length > 0) {
      const peekedContainer = this.internalStack[length - 1]
      if (peekedContainer.type == type)
        this.internalStack.pop()
    }
  }

  peekCurrentContainer(): ReactElement<any> | undefined {
    const length = this.internalStack.length
    if (length > 0)
      return this.internalStack[length - 1].element
  }

}
