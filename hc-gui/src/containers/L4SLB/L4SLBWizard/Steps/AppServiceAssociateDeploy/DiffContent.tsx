import * as React from 'react'
import { A10Container } from 'a10-gui-framework'
import { A10Row, A10Col } from 'a10-gui-widgets'
import { stringAsLines, SequenceMatcher } from 'jsdifflib'
import AflexCodeEditor from 'src/components/shared/AflexCodeEditor'
import AppSvcDetail from './AppSvcDetail'
import { CertInfo } from 'src/libraries/certpem'

export interface IDiffContentProps {
  record: IObject
  type: string
  hasAppAssoc: boolean
}

class DiffContent extends A10Container<IDiffContentProps, any> {
  /* istanbul ignore next */
  syncScrollBar = (type: string) => {
    const { record } = this.props
    const tagLeft =
      '#diff-' + record.uuid + ' .diff-left .CodeMirror-vscrollbar'
    const tagRight =
      '#diff-' + record.uuid + ' .diff-right .CodeMirror-vscrollbar'
    const left = document.querySelector(tagLeft)
    const right = document.querySelector(tagRight)
    if (type === 'left') {
      right.scrollTop = left.scrollTop
    } else {
      left.scrollTop = right.scrollTop
    }
  }

  renderListCloset = (config: string, version: string, diff: any[]) => {
    const options = {
      mode: { name: 'text/x-aflex' },
      extraKeys: { Ctrl: 'autocomplete' },
      theme: 'a10',
      readOnly: true,
    }
    return (
      <AflexCodeEditor
        value={config}
        options={options}
        version={version}
        diff={diff}
      />
    )
  }

  renderCert = (pem: string) => {
    const certpem = new CertInfo()
    let certObject = null
    if (pem) {
      /* istanbul ignore next */
      certObject = certpem.getCertInfo(pem)
    }
    const certInfo = certpem.getCertString(certObject)
    return (
      <>
        <div className="row section-row-compact">
          <div className="text-block">
            <span className="block-title">Serial Number:</span>
            <span className="block-value">{certInfo.serialNum}</span>
          </div>
        </div>
        <div className="row section-row-compact">
          <div className="text-block">
            <span className="block-title">Signature Algorithm:</span>
            <span className="block-value">{certInfo.sigAlgo}</span>
          </div>
        </div>
        <div className="row section-row-compact">
          <div className="text-block">
            <span className="block-title">Issuer:</span>
          </div>
          <div className="text-block">
            <span className="block-value">{certInfo.issuerC}</span>
          </div>
          <div className="text-block">
            <span className="block-value">{certInfo.issuerCN}</span>
          </div>
        </div>
        <div className="row section-row-compact">
          <div className="text-block">
            <span className="block-title">Valid from:</span>
            <span className="block-value">{certInfo.validFrom}</span>
          </div>
        </div>
        <div className="row section-row-compact">
          <div className="text-block">
            <span className="block-title">Valid to:</span>
            <span className="block-value">{certInfo.validTo}</span>
          </div>
        </div>
        <div className="row section-row-compact">
          <div className="text-block">
            <span className="block-title">Subject:</span>
          </div>
          <div className="text-block">
            <span className="block-value">{certInfo.subjectC}</span>
          </div>
          <div className="text-block">
            <span className="block-value">{certInfo.subjectCN}</span>
          </div>
        </div>
      </>
    )
  }
  /* istanbul ignore next */
  syncScrollBarRight = () => {
    this.syncScrollBar('right')
  }
  /* istanbul ignore next */
  syncScrollBarLeft = () => {
    this.syncScrollBar('left')
  }

  render() {
    const { record, type, hasAppAssoc } = this.props
    /* istanbul ignore next */
    if (type !== 'Certificate') {
      const before = record.before ? stringAsLines(record.before) : ''
      const after = record.latest ? stringAsLines(record.latest) : ''
      const opcodes = new SequenceMatcher(before, after).get_opcodes()
    }
    return (
      <div className="app-assoc-deploy-content" id={'diff-' + record.uuid}>
        {hasAppAssoc ? (
          <A10Row>
            <A10Col span={24}>
              <AppSvcDetail deploySpec={record.deployspec} />
            </A10Col>
          </A10Row>
        ) : null}
        <A10Row>
          <A10Col span={12}>
            <div
              className="app-assoc-deploy-content-tab diff-left"
              onMouseOver={this.syncScrollBarLeft}
            >
              <div>Running Version</div>
              {type !== 'Certificate'
                ? this.renderListCloset(record.before, 'before', opcodes)
                : this.renderCert(record.before)}
            </div>
          </A10Col>
          <A10Col span={12}>
            <div
              className="app-assoc-deploy-content-tab diff-right"
              onMouseOver={this.syncScrollBarRight}
            >
              <div>Working Version</div>
              {type !== 'Certificate'
                ? this.renderListCloset(record.latest, 'after', opcodes)
                : this.renderCert(record.latest)}
            </div>
          </A10Col>
        </A10Row>
      </div>
    )
  }
}

export default DiffContent
