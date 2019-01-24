import { A10Component } from 'a10-gui-framework'

export interface IAbstractStepProps {
  onPrev?: () => void
  onNext?: () => void
}

export default abstract class AbstractStep<
  P extends IAbstractStepProps = {
    onPrev?: () => void
    onNext?: () => void
  },
  S = {}
> extends A10Component<P, S> {
  abstract onPrev(props: P): void
  abstract onNext(props: P): void
}
