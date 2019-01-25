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
  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  }
}
