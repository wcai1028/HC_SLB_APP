import { A10Component, IValidationResult } from 'a10-gui-framework'

export interface IAbstractStepProps {
  onPrev?: () => void
  onNext?: () => void
  onChange?: (data: IObject) => void
  data?: {}
  isUpdate?: boolean
}

export default abstract class AbstractStep<
  P extends IAbstractStepProps = {
    onPrev?: () => void
    onNext?: () => void
    onChange?: (data: IObject) => void
    data?: {}
    isUpdate?: false
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

  defaultValidationResult: IValidationResult = {
    validateStatus: 'success',
    help: '',
  }
}
