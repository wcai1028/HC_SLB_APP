import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { AuthenticationService, Utilities } from 'src/services'
import './styles/acceptterms.scss'
export interface IAcceptTermsProps {
  token: string
  user: string
  provider: string
}
export interface IAcceptTermsState {
  termsAccepted: boolean
}

class AcceptTerms extends A10Component<IAcceptTermsProps, IAcceptTermsState> {
  AuthenticationService = new AuthenticationService()
  Utilities = new Utilities()
  state = {
    termsAccepted: false,
  }
  termsAccepted = () => {
    const authHeader = {
      token: this.props.token,
      Accept: 'application/json',
    }

    let termsAcceptanceSet = this.AuthenticationService.setTermsAccepted(
      authHeader,
      null,
      [this.props.user],
    )
    termsAcceptanceSet
      .then((resp: any) => {
        window.location.href =
          '/confirm/' +
          this.props.user +
          '/' +
          this.props.token +
          '?provider=' +
          this.props.provider
      })
      .catch((resp: any) => {
        //  this.Utilities.showMessage('ERROR_TERMS_UPDATION', 0, true);
      })
  }
  render() {
    return (
      <div className="terms-container background-polygons">
        <div className="terms-wrapper">
          <div className="modal-body terms-section">
            <p className="center">
              <strong>A10 NETWORKS, INC.</strong>
            </p>
            <p className="center">
              <strong>
                A10 HARMONY<sup>TM</sup> CONTROLLER SOFTWARE
              </strong>
            </p>
            <p className="center">
              <strong>SUBSCRIPTION SERVICES AGREEMENT</strong>
            </p>
            <p>
              <strong />
            </p>
            <p className="center">
              <strong>
                <u>Terms and Conditions</u>
              </strong>
            </p>
            <p className="center">
              <strong>
                <u />
              </strong>
            </p>
            <p>
              THE TERMS AND CONDITIONS OF THIS A10 HARMONY CONTROLLER SOFTWARE
              SUBSCRIPTION SERVICES AGREEMENT (“AGREEMENT”) GOVERN USE OF
              (INCLUDING PAYMENT FOR) A10 HARMONY CONTROLLER SOFTWARE SERVICES
              AND RELATED DOCUMENTATION.
            </p>
            <p>
              A10 is willing to license and allow access to Services to you
              personally or the Company you work for (“<strong>
                Subscriber
              </strong>”) only upon the condition that Subscriber accepts all
              the terms contained in this Agreement. If you are accepting the
              terms of this Agreement on behalf of a company or other legal
              entity, you represent and warrant that you have the authority to
              bind that company or other legal entity to the terms of this
              Agreement, and, in such event, “Subscriber” will refer to that
              company or other legal entity. If Subscriber does not accept all
              the terms of this Agreement, then A10 is unwilling to license or
              allow access of the Services to Subscriber, and Subscriber must
              cease using the Services.
            </p>
            <p>
              1. <strong>Scope</strong>. This Agreement applies to the
              Subscriber’s access to and use of A10 Harmony Controller software
              subscription services (“<strong>Service</strong>” or “<strong>
                Services
              </strong>”) identified in one or more ordering documents agreed by
              the Parties, including any exhibits thereto (“<strong>
                Order
              </strong>” or “<strong>Orders</strong>”).{' '}
              <strong>Services</strong> also include Subscriber’s license to the
              associated software controller and software module licenses
              purchased in an Order, such software delivered in executable form
              (the “ <strong>Software</strong>”). This Agreement and all Orders
              represent the Parties’ entire understanding regarding the Services
              and shall control over any different or additional terms of any
              purchase order or other non-A10 ordering document, and no terms
              included in any such purchase order or other non-A10 ordering
              document shall apply to the Services. In the event of a conflict
              between this Agreement and an Order, the terms of this Agreement
              shall control.
            </p>
            <p>
              2. <strong>Grant of License</strong>
              <strong> To Use Services</strong>
              <strong>. </strong>
            </p>
            <p>
              2.1. Production License. Conditioned upon Subscriber’s compliance
              with the terms and conditions of this Agreement, during the Term,
              A10 grants Subscriber a non-exclusive and non-transferable license
              during the Term for Subscriber to use the Services and to Execute
              the Software, solely for Subscriber’s internal business purposes,
              which may include providing hosting, application, service bureau,
              or software-as-a-service (SaaS) services to third parties
              (“Production License”). “<strong>Execute</strong>
              ” or “<strong>Execution</strong>” means to load, install, and run
              the Software in order to benefit from its functionality as
              designed by A10.
            </p>
            <p>
              2.2. Trial License. Notwithstanding the foregoing, if Subscriber
              has been provided a trial version of the Services and has not paid
              the fees, Subscriber’s license is limited to a Trial License,
              namely as follows: Conditioned upon Subscriber’s compliance with
              the terms and conditions of this Agreement, during the Trial Term,
              A10 grants Subscriber a non-exclusive and non-transferable license
              for Subscriber to use the Services and to Execute the Software,
              solely for Subscriber internal business purposes, solely in a
              non-production environment, solely for the purpose of evaluating
              whether Subscriber will purchase a production-environment use
              license, and solely during the Trial Term; the SERVICES MAY
              CONTAIN A DISABLING DEVICE THAT WILL PREVENT IT FROM BEING USED
              AFTER THE TRIAL TERM ENDS. SUBSCRIBER AGREES NOT TO TAMPER WITH
              THE DISABLING DEVICE OR THE SERVICES. SUBSCRIBER SHOULD TAKE
              PRECAUTIONS TO AVOID ANY LOSS OF DATA THAT MIGHT RESULT WHEN THE
              SERVICES CAN NO LONGER BE USED.
            </p>
            <p>
              3. <strong>Services.</strong>
            </p>
            <p>
              3.1. <strong>Access to Services.</strong> During the Subscription
              Term (as defined below), Subscriber may access and use the
              Services and may permit Users to access and use the Services,
              subject to the terms of the Agreement. “<strong>Users</strong>”
              means Subscriber's employees, agents or contractors who are
              authorized by Subscriber to use the Services on behalf of
              Subscriber; <em>provided however</em> that Subscriber is
              responsible for ensuring compliance with the terms of this
              Agreement by all its Users.
            </p>
            <p>
              3.2. <strong>Use.</strong> Services licensed by Subscriber may be
              used and Software may be installed and Executed in a third party
              service provider cloud environment operated for the benefit of
              Subscriber or at a site owned or operated by Subscriber, and may
              be used for the Subscription Term only up to the designated
              capacity metrics purchased in an Order (such as, the maximum
              number of managed devices, applications, amount of bandwidth or
              byte quantity per time interval).
            </p>
            <p>
              3.3. <strong>Subscriber</strong>
              <strong> Equipment.</strong> Subscriber shall be solely
              responsible for obtaining and maintaining appropriate equipment
              and ancillary services needed to connect to, access or otherwise
              use the Services, including, without limitation, computers,
              computer operating system and web browser (collectively, "<strong>
                Equipment
              </strong>
              "). Subscriber shall ensure that Equipment complies with all
              configurations and specifications set forth in A10’s published
              documentation.
            </p>
            <p>
              3.4. <strong>Subscriber</strong>
              <strong> Data.</strong> Subscriber will have sole responsibility
              for the accuracy, quality, integrity, reliability, and
              appropriateness of all Subscriber Data. “<strong>
                Subscriber
              </strong>{' '}
              <strong> Data</strong>” means all data, information and content
              that Subscriber uploads for storage or processing by the Services.
            </p>
            <p>
              3.5. <strong>Services Configuration.</strong> The Services consist
              of configurable capabilities, such as load balancing, content
              switching, web application firewalling, application delivery
              optimization, and application traffic insights. While A10 may
              assist Subscriber or provide examples to Subscriber in configuring
              the capabilities, Subscriber is solely responsible for determining
              the appropriate configuration for each capability that it uses,
              and for the resulting operation and performance of the Services.
            </p>
            <p>
              4. <strong>A10 OBLIGATIONS.</strong>
            </p>
            <p>
              4.1. <strong>Provision of Purchased Services.</strong> During the
              Subscription Term purchased, A10 will (a) make the Services
              available to Subscriber pursuant to this Agreement and the
              applicable Order Forms at no additional charge, and/or upgraded
              support if purchased. The SERVICES MAY CONTAIN A DISABLING DEVICE
              THAT WILL PREVENT IT FROM BEING USED AFTER TERMINATION OR
              EXPIRATION OF THE SUBSRIPTION TERM. SUBSCRIBER AGREES NOT TO
              TAMPER WITH THE DISABLING DEVICE OR THE SERVICES. SUBSCRIBER
              SHOULD TAKE PRECAUTIONS TO AVOID ANY LOSS OF DATA THAT MIGHT
              RESULT WHEN THE SERVICES CAN NO LONGER BE USED
            </p>
            <p>
              4.2. <strong>Support and Maintenance.</strong> A10 will provide
              support for Subscriber’s use of the Services in accordance with
              A10’s then-standard support services description at
              <a href="http://www.a10networks.com/support" target="_blank">
                www.a10networks.com/support
              </a>
              website (“<strong>Support</strong>”) for the Subscription Term.
              A10 may update or modify the Services from time to time in its
              discretion; provided that A10 will not materially decrease the
              functionality of the Services. Support includes Maintenance
              Releases but not New Versions. “Maintenance Release” means any
              update or release of the Services that A10 may provide to the
              Subscriber when and if available during the Subscription Term,
              that may contain, among other things, error corrections,
              enhancements or other changes to the user interface,
              functionality, compatibility, capabilities, performance,
              efficiency or quality of the Services, but does not constitute a
              New Version. “New Version” means any new version of the Services
              that A10 may from time to time introduce and market generally as a
              distinct licensed product, and which A10 may make available to the
              Subscriber at an additional cost under a separate written
              agreement.
            </p>
            <p>
              5. <strong>Suspension or Termination</strong>. A10 reserves the
              right to temporarily suspend or permanently terminate use of or
              access to the Services by Subscriber or User(s) in the event that
              (i) Subscriber or such User(s) violates, or is deemed by A10, in
              A10’s sole determination to be in violation of the terms of this
              Agreement, (ii) uses the Services in a manner that A10 reasonably
              believes will cause it liability, or (iii) A10 does not timely
              receive payment from the Subscriber or, as applicable, the channel
              partner, that purchased the Services from A10. Subscriber also
              remains responsible for paying Subscriber’s annual service fee if
              Subscriber’s Service is suspended as permitted herein.
            </p>
            <p>
              6. <strong>Payment and Fees.</strong>
            </p>
            <p>
              6.1. <strong>Fees and Taxes.</strong> Subscriber shall pay all
              fees set forth in an invoice. All fees are non-cancelable,
              nonrefundable and non-creditable, and quantities purchased cannot
              be decreased during the relevant subscription term. All fees are
              exclusive of taxes, levies, or duties imposed by taxing
              authorities, and Subscriber shall be responsible for payment of
              all such taxes, levies, or duties (excluding U.S. taxes based on
              A10’s income), even if such amounts are not listed in an invoice.
              The amounts payable under this Agreement do not include sales or
              use tax, goods and services tax or customs duties, withholding
              taxes or any similar taxes, duties and fees including state and
              local taxes, duties and fees (if applicable). If any such tax,
              duty or fee is applicable to the fees payable to A10, the payment
              due from Subscriber to A10 will be grossed up such that A10 will
              receive the fees payable as if no such tax or duty had been
              applied. Subscriber shall pay all fees in U.S. Dollars or in such
              other currency as agreed to in writing by A10.
            </p>
            <p>
              6.2. <strong>Invoicing and Payment.</strong> Subscriber will
              receive invoices in advance of the applicable subscription term
              that are due in full. Subscriber’s invoice will include recurring
              charges, prorated charges/credits based on the install/disconnect
              date, administrative, and late payment charges, and any
              non-recurring charges. Applicable taxes and surcharges may be
              added if applicable. All amounts invoiced are due and payable
              within thirty (30) days of the date of invoice. Unpaid invoices
              that are not the subject of a written good faith dispute are
              subject to a finance charge of 1.5% per month on any outstanding
              balance, or the maximum permitted by law, whichever is lower, plus
              all reasonable expenses of collection.
            </p>
            <p>
              6.3. <strong>Purchases through Channel Partners.</strong> If
              Subscriber purchases the Services from an A10 channel partner,
              then this Section 6 will not apply and payment and fees will be as
              agreed between Subscriber and such channel partner.
            </p>
            <p>
              7. <strong>Rates.</strong>
              <strong />
            </p>
            <p>
              <strong />
            </p>
            <p>
              7.1. <strong>Changes.</strong> A10 may change any rates, fees,
              expenses, or charges regarding Subscriber’s Services at any time.
              A10 will provide Subscriber with notice of material changes either
              in Subscriber’s invoice or separately. <strong />
            </p>
            <p>
              IF A10 INCREASES THE PRICE OF ANY OF THE SERVICES TO WHICH
              SUBSCRIBER SUBSCRIBES, BEYOND THE LIMITS SET FORTH IN SUBSCRIBER’S
              ORDER, A10 WILL DISCLOSE THE CHANGES AT LEAST ONE BILLING CYCLE IN
              ADVANCE (EITHER THROUGH A NOTICE WITH SUBSCRIBER’S BILL, EMAIL OR
              OTHERWISE), AND SUBSCRIBER MAY TERMINATE THIS AGREEMENT WITHOUT
              PAYING AN EARLY TERMINATION FEE PROVIDED SUBSCRIBER’S NOTICE OF
              TERMINATION IS DELIVERED TO A10 WITHIN THIRTY (30) DAYS AFTER THE
              FIRST NOTIFICATION REFLECTING THE CHANGE.
            </p>
            <p>
              7.2. <strong>Charges</strong>. Subscriber is responsible for
              paying all charges for or resulting from Services provided under
              this Agreement, including, without limitation, recurring service,
              usage charges, activation fees that may apply to each optional
              service, overage charges, administrative, and late payment
              charges.
            </p>
            <p>
              IF SUBSCRIBER DISPUTES ANY CHARGES ON SUBSCRIBER’S INVOICE,
              SUBSCRIBER MUST NOTIFY A10 IN WRITING WITHIN 30 DAYS OF THE DATE
              OF THE INVOICE OR SUBSCRIBER WILL HAVE WAIVED ITS RIGHT TO DISPUTE
              THE INVOICE AND TO PARTICIPATE IN ANY LEGAL ACTION RAISING SUCH
              DISPUTE.
            </p>
            <p>
              7.3. <strong>Advance Payments And/Or Deposits.</strong>{' '}
              <a id="_Ref370835448" target="_blank">
                {' '}
              </a>A10 may require Subscriber to make deposits or advance
              payments for Services, which A10 may offset against any unpaid
              balance on Subscriber’s account. Interest will not accrue on
              advance payments or deposits unless required by law. Based on
              Subscriber’s creditworthiness as A10 determines it, A10 may
              establish a credit limit and restrict Services or features. If
              Subscriber’s account balance goes beyond the limit A10 set for
              Subscriber, A10 may immediately interrupt or suspend Services
              until Subscriber’s outstanding balance is brought below the credit
              limit. Any charges Subscriber incurs in excess of Subscriber’s
              limit become immediately due. If Subscriber has more than one
              account with A10, Subscriber must keep all accounts in good
              standing to maintain Services. If one account is past due or over
              its limit or Subscriber’s accounts when aggregated are over its
              limit, all accounts in Subscriber’s name are subject to
              interruption or termination and all other available collection
              remedies.
            </p>
            <p>
              <a id="whatAreTheGenTermsApplyDataMsgPlans" target="_blank" />
              8. <strong>Service Limitations.</strong>
            </p>
            <p>
              <a id="whatAreTheIntendedPurposesOfDataServ" target="_blank" />
              8.1. <strong>Prohibited Uses Of Services</strong>.
            </p>
            <p>
              8.1.1. Services are not intended to be used in any manner which
              has any of the following effects and such use is prohibited if it:
              (a) conflicts with applicable law, (b) hinders other customers’
              access to the Services network, (c) compromises Services network
              security or capacity, (d) excessively and disproportionately
              contributes to network congestion, (e) adversely impacts network
              service levels or legitimate data flows, (f) degrades network
              performance, or (g) causes harm to the network or other customers.
            </p>
            <p>
              8.1.2. The Services may <u>not</u> be used in any manner that: (i)
              defeats, obstructs or penetrates, or attempts to defeat, obstruct
              or penetrate the security measures of A10’s network or systems, or
              another entity’s network or systems; (ii) accesses, or attempts to
              access without authority, the accounts of others; or (iii)
              adversely affects the ability of other people or systems to use
              either A10’s services or other parties’ Internet-based resources.
              For example, this includes, but is not limited to, using malicious
              software or “malware” that is designed, intentionally or
              unintentionally, to infiltrate a network or computer system such
              as spyware, worms, Trojan horses, rootkits, and/or crimeware;
              attempting “denial of service” attacks against a network host or
              individual user; and sending “spam” or unsolicited commercial or
              bulk email (or activities that have the effect of facilitating
              unsolicited commercial email or unsolicited bulk e-mail).
            </p>
            <p>
              8.1.3. Services may not be used in any manner that has the effect
              of excessively contributing to network congestion, or hindering
              other customers’ access to the network. For example, this
              includes, but is not limited to, using “auto-responders,”
              “cancel-bots,” or similar automated or manual routines that
              generate excessive amounts of traffic or that disrupt user groups
              or email use by others and software or other devices that maintain
              continuous active Internet connections when a connection would
              otherwise be idle or any “keep alive” functions, unless they
              adhere to A10 data retry requirements (as may be modified from
              time to time).
            </p>
            <p>
              8.1.4. Subscriber will not use Services for any of the prohibited
              activities set forth in this Section 8 (1).
            </p>
            <p>
              8.2. <strong>A10’s</strong>
              <strong> Rights to Ensure Compliance.</strong>
              Subscriber agrees that A10 has the right to take any and all
              actions necessary to enforce this Section 8 if Subscriber uses
              Services in any manner that is prohibited, including, but not
              limited to, the following actions:
            </p>
            <p>
              8.3. <strong>Additional </strong>
              <strong>Subscriber</strong> <strong> Obligations.</strong> As a
              condition to A10 providing Subscriber with the Services,
              Subscriber acknowledges and agrees that it is responsible for each
              of the following:
            </p>
            <p>
              8.3.1. Subscriber will ensure that all Users given access to the
              Services have the right to access the information and data made
              accessible to them by Subscriber through the Services.
            </p>
            <p>
              8.3.2. Subscriber will (a) obtain all permissions, authorizations,
              licenses or approvals from each applicable data source as may be
              necessary or required to use and to provide the Subscriber Data to
              A10 in connection with the delivery of the Services and (b) comply
              with all applicable laws in its performance under this Agreement.
            </p>
            <p>
              8.3.3. Subscriber will ensure that none of the Subscriber Data
              contains any viruses or similar contaminants.
            </p>
            <p>
              8.4. <strong>Future Functionality. </strong>Subscriber agrees that
              its purchases are not contingent on the delivery of any future
              functionality or features, or dependent on any oral or written
              public comments made by A10 regarding future functionality or
              features.
            </p>
            <p>
              9. <strong>License Restrictions.</strong>
              Except as expressly specified in this Agreement, Subscriber agrees
              not to do any of the following, notwithstanding the fair use
              doctrine or any statutory or common law provision that might
              otherwise permit any of the following (except to the extent
              applicable law makes any of the following prohibitions
              unenforceable or otherwise permits the recited acts
              notwithstanding the agreement not to perform them): (a) copy
              (except in the course of loading or installing) or modify the
              Services, including but not limited to adding new features or
              otherwise making adaptations that alter the functioning of the
              Services; (b) transfer, sublicense, sell, resell, lease, lend,
              rent or otherwise distribute or make the Services available to any
              third party; (c) make the functionality of the Services available
              to Users through any means except as expressly provided herein,
              including but not limited to by allowing the Services to be used
              as a file-sharing service; or (c) use the Services for purposes of
              competitive analysis of the Services, the development of a
              competing Services product or any other purpose that is to A10’s
              commercial disadvantage.
            </p>
            <p>
              10. <strong>Trade Secrets.</strong>
              Subscriber acknowledges and agrees that portions of the Services,
              including but not limited to the underlying software that enables
              the Services and the specific design and structure of individual
              modules or programs, constitute or contain trade secrets of A10
              and its licensors. Accordingly, Subscriber agrees not to
              disassemble, decompile or reverse engineer the Services, in whole
              or in part, or permit or authorize a third party to do so, except
              to the extent such activities are expressly permitted by law
              notwithstanding this prohibition. Further, Subscriber agrees not
              to publicly display or disclose to third parties the Services, or
              any portions thereof, including, but not limited to performance
              metrics.
            </p>
            <p>
              11. <strong>CONFIDENTIALITY</strong>
              <strong>.</strong>
              <strong />
            </p>
            <p>
              11.1. <strong>Definition of Confidential Information</strong>.
              “Confidential Information” means all information disclosed by a
              party (“Disclosing Party”) to the other party (“Receiving Party”),
              whether orally or in writing, that is designated as confidential
              or that reasonably should be understood to be confidential given
              the nature of the information and the circumstances of disclosure.
              Subscriber Confidential Information includes Subscriber Data; A10
              Confidential Information includes the Services and underlying
              software; and Confidential Information of each party includes the
              terms and conditions of this Agreement and all Order Forms
              (including pricing), as well as business and marketing plans,
              technology and technical information, product plans and designs,
              and business processes disclosed by such party. However,
              Confidential Information does not include any information that (i)
              is or becomes generally known to the public without breach of any
              obligation owed to the Disclosing Party, (ii) was known to the
              Receiving Party prior to its disclosure by the Disclosing Party
              without breach of any obligation owed to the Disclosing Party,
              (iii) is received from a third party without breach of any
              obligation owed to the Disclosing Party, or (iv) was independently
              developed by the Receiving Party.
            </p>
            <p>
              11.2. <strong>Duty of Care. </strong>The Receiving Party will use
              the same degree of care that it uses to protect the
              confidentiality of its own confidential information of like kind
              (but not less than reasonable care) to (i) not use any
              Confidential Information of the Disclosing Party for any purpose
              outside the scope of this Agreement, and (ii) except as otherwise
              authorized by the Disclosing Party in writing, limit access to
              Confidential Information of the Disclosing Party to those of its
              and its affiliates’ employees and contractors who need that access
              for purposes consistent with this Agreement and who are subject to
              confidentiality obligations to the Receiving Party not materially
              less protective of the Confidential Information than those herein.
              Neither party will disclose the terms of this Agreement or any
              Order Form to any third party other than its affiliates, legal
              counsel and accountants without the other party’s prior written
              consent, provided that a party that makes any such disclosure to
              its affiliate, legal counsel or accountants will remain
              responsible for such affiliate’s, legal counsel’s or accountant’s
              compliance with this Section 11 (“Confidentiality”).
              Notwithstanding the foregoing, A10 may disclose the terms of this
              Agreement and any applicable Order Form to a subcontractor to the
              extent necessary to perform A10’s obligations to Subscriber under
              this Agreement, under terms of confidentiality materially as
              protective as set forth herein.
            </p>
            <p>
              11.3. <strong>Compelled Disclosure.</strong> The Receiving Party
              may disclose Confidential Information of the Disclosing Party to
              the extent compelled by law to do so, provided the Receiving Party
              gives the Disclosing Party prior notice of the compelled
              disclosure (to the extent legally permitted) and reasonable
              assistance, at the Disclosing Party's cost, if the Disclosing
              Party wishes to contest the disclosure. If the Receiving Party is
              compelled by law to disclose the Disclosing Party’s Confidential
              Information as part of a civil proceeding to which the Disclosing
              Party is a party, and the Disclosing Party is not contesting the
              disclosure, the Disclosing Party will reimburse the Receiving
              Party for its reasonable cost of complying and providing secure
              access to that Confidential Information.
            </p>
            <p>
              12. <strong>OWNERSHIP.</strong> The Services (including Software)
              are licensed, not sold. As between Subscriber and A10, all right,
              title, and interest in and to the Services, and any and all
              intellectual property rights therein, belong exclusively to A10.
              The Services are protected by United States patent, copyright and
              trade secret laws and international treaties. Subscriber will not
              delete or in any manner alter the copyright, trademark, and other
              proprietary rights notices or markings appearing on the Services
              as delivered to Subscriber. Nothing contained in this Agreement
              shall be construed as transferring any right, title, or interest
              in or to the Services and/or any intellectual property rights in
              the same to Subscriber, and except for the limited rights granted
              to Subscriber as expressly set forth herein, all such rights are
              reserved to A10.
            </p>
            <p>
              13. <strong>Usage Information</strong>
              <strong>. </strong>
              A10 will collect remotely data with respect to Subscriber’s use of
              the Services and A10’s storage or processing of Subscriber Data,
              including but not limited to quantity of traffic, bandwidth used,
              number of managed devices and viability of the Services for A10’s
              use including but not limited to invoicing Subscriber, and
              providing Subscriber support and maintenance services
              (collectively, “<strong>Usage Information</strong>”).
              Additionally, Subscriber will permit A10’s authorized
              representatives to examine Usage Information at Subscriber’s site
              on reasonable prior notice. A10 will use reasonable methods to
              monitor and collect Usage Information to better optimize the
              operation of the network, and use such Usage Information and the
              know-how resulting from the provision of the Services to enhance,
              improve and provide the Services and new products and services.
            </p>
            <p>
              Subscriber remains responsible for 1) any data and the content of
              any database Subscriber makes available to A10 Networks, 2) the
              selection and implementation of procedures and controls regarding
              access, security, encryption, use, and transmission of data
              (including any personally-identifiable data), and 3) backup and
              recovery of any database and any stored data. Subscriber will not
              send or provide A10 Networks access to any personally-identifiable
              information, whether in data or any other form, and will be
              responsible for reasonable costs and other amounts that A10
              Networks may incur relating to any such information mistakenly
              provided to A10 Networks or the loss or disclosure of such
              information by A10 Networks, including those arising out of any
              third party claims.
            </p>
            <p>
              14. <strong>Term and Termination</strong>
              <strong>.</strong>
            </p>
            <p>
              14.1. <strong>Term.</strong> The Agreement shall commence as of
              the date set forth in the first Order (“<strong>
                Commencement Date
              </strong>”) and, unless earlier terminated as set forth herein,
              shall remain in effect through the end of the term set forth in
              any current Order (“ <strong>Subscription Term</strong>”). The
              term of this Agreement shall automatically expire at the end of
              the Subscription Term, and may be renewed upon the agreement of
              the parties.
            </p>
            <p>
              14.2. <strong>Termination for Convenience.</strong> Subscriber may
              terminate this Agreement for any or no reason prior to the end of
              the Subscription Term; provided however that all fees for the
              then-current Subscription Term are non-cancelable, nonrefundable
              and non-creditable. Termination will be effective upon A10’s
              receipt of (i) written notice of the request to terminate from
              Subscriber or the applicable channel partner at least thirty (30)
              days in advance written of the requested date of termination, and
              (ii) any other amounts owed from Subscriber or the applicable
              channel partner for Services provided through the date of
              termination.
            </p>
            <p>
              14.3. <strong>Termination for Breach.</strong> In the event of a
              material breach by either Party of this Agreement or any Order,
              the non-breaching Party shall have the right to terminate the
              applicable Order or this Agreement, in such Party’s sole
              discretion, for cause if such breach has not been cured within
              thirty (30) days of written notice from the non-breaching Party
              specifying the breach in detail. A10 may immediately terminate
              Subscriber's password, account, and access to the Services if (i)
              Subscriber fails to make payment due within ten (10) business days
              after A10 has provided Subscriber with notice of such failure; or
              (ii) Subscriber violates Section 3, 5, 8 (1), 8 (3), 9, 10, 11 or
              12 of this Agreement. Any suspension by A10 of the Services under
              the preceding sentence shall not relieve Subscriber of its payment
              obligations under the Agreement. If A10 terminates an Order for
              Subscriber's material breach, all fees set forth on such Order are
              immediately due and payable.
            </p>
            <p>
              14.4. <strong> </strong>
              <strong>Termination for Insolvency</strong>. Either Party may
              terminate this Agreement immediately at its option if the other
              Party (i) ceases to do business in the normal course; (ii) becomes
              or is declared insolvent or bankrupt; (iii) is the subject of any
              proceeding related to its liquidation or insolvency (whether
              voluntary or involuntary) which is not dismissed within ninety
              (90) days; or (iv) makes an assignment for the benefit of
              creditors.
            </p>
            <p>
              14.5. <strong>Effect of Termination</strong>
            </p>
            <p>
              14.5.1. <strong>Subscriber</strong>
              <strong> Data.</strong> Upon any termination or expiration of an
              Order or this Agreement, Subscriber's right to access and use the
              Services covered by that Order or this Agreement, as applicable,
              shall terminate. Subscriber acknowledges and agrees that A10 has
              no obligation to retain Subscriber Data and that A10 may, in its
              sole discretion, and without notice to Subscriber, irretrievably
              delete and destroy Subscriber Data after the termination of the
              Agreement.
            </p>
            <p>
              14.5.2. <strong>Services</strong>
              <strong>.</strong> The right to access the Service will
              automatically terminate upon termination or expiration of this
              Agreement or the applicable Order for any reason.
            </p>
            <p>
              14.5.3. <strong>Survival.</strong> The following provisions will
              survive any expiration or termination of this Agreement: 5, 9, 10,
              11, 12, 13, 14, 17, 18 and 20.
            </p>
            <p>
              15. <strong>Limited Warranty.</strong>
            </p>
            <p>
              15.1. <strong>Warranty.</strong> A10 provides the Services using a
              commercially reasonable level of care.
            </p>
            <p>
              15.2. <strong>Limitations.</strong> Except for the foregoing, the
              Services are provided “AS IS”. In no event does A10 warrant that
              the Services are error free or that Subscriber will be able to
              operate the Services without problems or interruptions. A10 does
              not warrant the following: (i) that the Services will meet
              Subscriber’s requirements, (ii) that the Services will operate in
              the combinations that Subscriber may select or configure, (iii)
              that the operation of the Services will be error-free or
              uninterrupted, or (iv) that all errors contained in the Services
              will be corrected. In addition, due to the continual development
              of new techniques for intruding upon and attacking networks, A10
              does not warrant that the Services, or any equipment, system or
              network on which the Services are used, will be free of
              vulnerability to intrusion or attack.
            </p>
            <p>
              15.3. <strong>Restrictions.</strong> This warranty does not apply
              if (a) the Services has been altered, except by A10 or its
              authorized representative, (b) the Services have not been used,
              installed, operated, or maintained in accordance with instructions
              supplied by A10, (c) the Services are licensed for trial, beta,
              evaluation, testing or demonstration purposes; or (d) Subscriber
              fails to notify A10 of any warranty deficiencies within 30 days
              from performance of the relevant Services or discovery of the
              relevant deficiency in the Services. This warranty also does not
              apply to (i) any temporary Software modules; and (ii) Services
              supplied by any third party.
            </p>
            <p>
              15.4. <strong>DISCLAIMER</strong>. THE LIMITED WARRANTY SET FORTH
              IN SECTION 15 (1) IS IN LIEU OF, AND, TO THE EXTENT ALLOWED BY
              APPLICABLE LAW, A10, ITS SUPPLIERS AND LICENSORS EXPRESSLY
              DISCLAIM, ALL OTHER WARRANTIES, REPRESENTATIONS AND CONDITIONS,
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY IMPLIED
              WARRANTIES AND CONDITIONS OF MERCHANTABILITY, FITNESS FOR A
              PARTICULAR PURPOSE, NON-INFRINGEMENT, SATISFACTORY QUALITY,
              NON-INTERFERENCE, ACCURACY OF INFORMATIONAL CONTENT, OR ARISING
              FROM A COURSE OF DEALING, LAW, USAGE, OR TRADE PRACTICE. TO THE
              EXTENT THAT ANY OF THE SAME CANNOT BE EXCLUDED, SUCH IMPLIED
              CONDITION, REPRESENTATION AND/OR WARRANTY IS LIMITED IN DURATION
              TO THE EXPRESS WARRANTY PERIOD REFERRED TO IN SECTION 15 (1)
              ABOVE. NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED
              FROM A10 OR ELSEWHERE WILL CREATE ANY WARRANTY OR CONDITION NOT
              EXPRESSLY STATED IN THIS AGREEMENT. Further, A10 shall have no
              liability for any deterioration, degradation or loss in Services
              in any way attributable to connectivity or network access, any
              third party product, service or software or User’s configuration
              of the Services or its network. This disclaimer and exclusion
              shall apply even if the express warranty set forth above fails to
              serve its essential purpose.
            </p>
            <p>
              16. <strong>A10</strong>
              <strong> Indemnification</strong>
              .
            </p>
            <p>
              16.1. <strong>Obligation.</strong>
              A10 agrees to defend or, at its option, settle, any third party
              claim, suit or proceeding ("<strong>Claim</strong>") brought
              against Subscriber alleging that the use of the Services or the
              Software by Subscriber in accordance with this Agreement infringes
              or misappropriates any intellectual property right of any third
              party. A10 will have sole control of the defense or settlement
              negotiations, and A10 agrees to pay, subject to the limitations
              set forth below, any final judgment entered against Subscriber, as
              a result of such infringement, in any such Claim defended by A10;
              provided that: (a) A10 is given prompt written notice of any such
              Claim and (b) Subscriber reasonably cooperates with A10, at A10’s
              expense, in such defense. Notwithstanding the foregoing, A10 shall
              have no obligation under this Section 16 or otherwise with respect
              to any Claims based upon (a) any use of the Services not in
              accordance with this Agreement; (b) any use of the Services in
              combination with other products, equipment, software or data not
              contemplated by this Agreement if such infringement would not have
              occurred absent such combination or use; or (c) any modification
              to the Services by anyone other than A10 if such infringement
              would not have occurred absent such modification.
            </p>
            <p>
              16.2. <strong>Additional Remedies.</strong> If any portion of the
              Services become, or in A10’s opinion is likely to become, the
              subject of a Claim, A10 may, at its option: (a) procure for
              Subscriber the right to continue using the Services; (b)replace
              the Services with non-infringing Services which do not materially
              impair the functionality of the Services; (c) modify the Services
              so the Services are non-infringing; or (d) terminate this
              Agreement and refund any prepaid fees, and upon such termination,
              Subscriber will immediately cease all use of the Services.
            </p>
            <p>
              16.3. <strong>Sole Remedy.</strong>
              This Section 16 states A10’s entire liability and Subscriber's
              sole and exclusive remedy with respect to alleged infringement of
              any intellectual property rights of any third party by the
              Services.
            </p>
            <p>
              17. <strong>Subscriber</strong>
              <strong> Indemnification</strong>
              . Subscriber agrees to defend or, at its option, settle any Claims
              brought against A10 based on Subscriber Data, Subscriber’s breach
              of this Agreement, or Subscriber’s or Users’ use of the Services
              other than in compliance with this Agreement. Subscriber shall
              have sole control of the defense or settlement negotiations, and
              Subscriber agrees to pay, subject to the limitations set forth
              below, any final judgment entered against A10, as a result of such
              breach, in any such Claim defended by Subscriber; provided that:
              (a) Subscriber is given prompt written notice of any such Claim;
              and (b) A10 reasonably cooperates with Subscriber, at Subscriber’s
              expense, in such defense.
            </p>
            <p>
              18. <strong>Limitation of Liability. </strong> A10’s TOTAL
              LIABILITY TO SUBSCRIBER FROM ALL CAUSES OF ACTION AND UNDER ALL
              THEORIES OF LIABILITY WILL BE LIMITED TO THE AMOUNTS PAID TO A10
              BY SUBSCRIBER FOR THE SERVICES OR, IN THE EVENT THAT A10 HAS MADE
              THE SERVICES AVAILABLE TO SUBSCRIBER WITHOUT CHARGE, A10’s TOTAL
              LIABILITY WILL BE LIMITED TO $500. IN NO EVENT WILL A10 BE LIABLE
              TO SUBSCRIBER FOR ANY SPECIAL, INCIDENTAL, EXEMPLARY OR PUNITIVE
              OR CONSEQUENTIAL DAMAGES (INCLUDING LOSS OF DATA, BUSINESS,
              PROFITS OR ABILITY TO EXECUTE) OR FOR THE COST OF PROCURING
              SUBSTITUTE PRODUCTS OR SERVICES, ARISING OUT OF OR IN CONNECTION
              WITH THIS AGREEMENT OR THE EXECUTION OR PERFORMANCE OF THE
              SERVICES, WHETHER SUCH LIABILITY ARISES FROM ANY CLAIM BASED UPON
              CONTRACT, WARRANTY, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY
              OR OTHERWISE, AND WHETHER OR NOT A10 HAS BEEN ADVISED OF THE
              POSSIBILITY OF SUCH LOSS OR DAMAGE. THE FOREGOING LIMITATIONS WILL
              SURVIVE AND APPLY EVEN IF ANY LIMITED REMEDY SPECIFIED IN THIS
              AGREEMENT IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE.
            </p>
            <p>
              19. <strong>Open Source Statement</strong>. The Software includes
              “Open Source Software” that is licensed pursuant to the Open
              Source Software license agreement(s) identified in the Open Source
              Software comments in the applicable source code file(s) and/or
              file header(s) provided with or otherwise associated with the
              Software. Additional detail may be provided (where applicable) in
              the accompanying on-line documentation, or within the user
              interface of the device, if any. With respect to Open Source
              Software, nothing in this Agreement limits any rights under, or
              grants rights that supersede, the terms of any applicable Open
              Source Software license agreement.
            </p>
            <p>
              20. <strong>Miscellaneous</strong>
            </p>
            <p>
              20.1. <strong>U.S. Government Customers.</strong> The Services
              qualify as “commercial items,” as that term is defined at Federal
              Acquisition Regulation (“FAR”) (48 C.F.R.) 2.101, “commercial
              computer software,” “commercial computer software documentation”
              or “technical data” as such terms are used in FAR 12.211 and FAR
              12.212. Consistent with FAR 12.211, FAR 12.212 and DoD FAR Supp.
              227.7102-1 through 227.7102-4 and 227.7202-1 through 227.7202-4,
              and notwithstanding any other FAR or other contractual clause to
              the contrary in any agreement into which the Agreement may be
              incorporated, Subscriber may provide to Government U.S. Government
              Customers or, if the Agreement is direct, U.S. Government
              Subscriber will acquire, the Services with only those rights set
              forth in the Agreement. Use of either the Services constitutes
              agreement by the U.S. Government Subscriber that the Services,
              Software and Documentation are “technical data,” “commercial
              computer software” or “commercial computer software
              documentation,” and constitutes acceptance of the rights and
              restrictions herein.
            </p>
            <p>
              20.2. <strong>Compliance with Laws. </strong> Subscriber agrees to
              comply in all material respects with all applicable laws, rules,
              and regulations in connection <strong>with</strong> its activities
              under this Agreement.
            </p>
            <p>
              20.3. <strong>Export Administration Act and Related Laws.</strong>{' '}
              The Services, underlying software and technology (hereafter
              referred to as Services and Technology) supplied by A10 under the
              Agreement are subject to export controls under the laws and
              regulations of the United States and any other applicable
              countries' laws and regulations. Subscriber shall be responsible
              for being knowledgeable as to all laws, regulations, and
              requirements regarding the export, re-export, transfer, diversion,
              release and/or import of the Services and Technology or data via
              the Services and any other A10 items (whether tangible or
              intangible, including without limitation commodities, software,
              technology, and technical data) that Subscriber may receive or
              access under this Agreement. Subscriber, at its cost, agrees to
              conduct all activities and obligations under this Agreement in
              conformity with such laws, regulations and requirements. In
              addition, Subscriber understands and agrees that the Services and
              Technology shall not, in the absence of authorization by United
              States and local law and regulations, as required, be used by or
              exported or re-exported to (i) any United States sanctioned or
              embargoed country, or to foreign nationals or residents of such
              countries; or (ii) any person, entity, organization or other party
              identified on the United States Department of Commerce's Denied
              Persons or Entity Lists, the United States Department of
              Treasury's Specially Designated Nationals or Blocked Persons
              Lists, or the Department of State's Debarred Parties List, as
              published and revised from time to time; (iii) any party engaged
              in nuclear, chemical/biological weapons or missile proliferation
              activities; or (iv) any party for use in the design, development,
              or production of rocket systems or unmanned air vehicles.
              Subscriber warrants and represents that it is not a person,
              entity, organization or other party identified on the United
              States Department of Commerce's Denied Persons or Entity List, the
              United States Department of Treasury's Specially Designated
              Nationals or Blocked Persons Lists, or the Department of State's
              Debarred Parties List, as published and revised from time to time.
            </p>
            <p>
              20.4. <strong>Anti-Corruption</strong>. Subscriber agrees that
              Subscriber has not received or been offered any illegal or
              improper bribe, kickback, payment, gift, or thing of value from
              any of A10’s employees or agents in connection with this
              Agreement. Reasonable gifts and entertainment provided in the
              ordinary course of business do not violate the above restriction.
            </p>
            <p>
              20.5. <strong>General.</strong> This Agreement will be governed by
              and construed in accordance with the laws of the State of
              California, without regard to or application of conflict of laws
              rules or principles. The United Nations Convention on Contracts
              for the International Sale of Goods will not apply. Subscriber may
              not assign or transfer this Agreement or any rights granted
              hereunder, by operation of law or otherwise, without A10’s prior
              written consent, and any attempt by Subscriber to do so, without
              such consent, will be void. A10 may assign or transfer this
              Agreement, by operation of law or otherwise, without Subscriber’s
              consent. Except as expressly set forth in this Agreement, the
              exercise by either Party of any of its remedies under this
              Agreement will be without prejudice to its other remedies under
              this Agreement or otherwise. All notices or approvals required or
              permitted under this Agreement will be in writing and delivered by
              confirmed facsimile transmission, by overnight delivery service,
              or by certified mail, and in each instance will be deemed given
              upon receipt. All notices or approvals will be sent to the
              addresses set forth in the applicable ordering document or invoice
              or to such other address as may be specified by either Party to
              the other in accordance with this section. The failure by either
              Party to enforce any provision of this Agreement will not
              constitute a waiver of future enforcement of that or any other
              provision. Any waiver, modification or amendment of any provision
              of this Agreement will be effective only if in writing and signed
              by authorized representatives of both Parties. If any provision of
              this Agreement is held to be unenforceable or invalid, that
              provision will be enforced to the maximum extent possible, and the
              other provisions will remain in full force and effect. This
              Agreement and all Order(s) are the complete and exclusive
              understanding and agreement between the Parties regarding its
              subject matter, and supersedes all proposals, understandings or
              communications between the Parties, oral or written, regarding its
              subject matter. Any terms or conditions contained in Subscriber’s
              purchase order or other ordering document that are inconsistent
              with or in addition to the terms and conditions of this Agreement
              are hereby rejected by A10 and will be deemed null. Except for
              payment obligations, neither Party will be liable for inadequate
              performance to the extent caused by a condition that was beyond
              the Party’s reasonable control (for example, natural disaster, act
              of war or terrorism, riot, labor condition, governmental action,
              and Internet disturbance). There are no third party beneficiaries
              to this Agreement. A10 may use third party contractors to perform
              some or all of A10’s obligations under this Agreement provided
              that A10 will be responsible for such performance.
            </p>
            <p>
              21. <strong>Notices.</strong>
              <strong />
            </p>
            <p>
              <strong>Trademarks</strong>
              . The A10 logo, A10 Networks and A10 Harmony are trademarks or
              registered trademarks of A10 Networks, Inc. in the United States
              and other countries. All other trademarks are property of their
              respective owners.
            </p>
            <p>
              <strong>Patent Protection</strong>
              . A10 Networks products including all A10 Thunder Series products
              are protected by one or more of the in the United States listed at{' '}
              <a href="http://www.a10networks.com/patent" target="_blank">
                www.a10networks.com/patent
              </a>.
            </p>
            <p>
              22. <strong>Contact Information. </strong>For additional
              information about A10 products, terms and conditions of delivery,
              and pricing, contact Subscriber’s nearest A10 Networks location,
              which can be found by visiting{' '}
              <a href="http://www.a10networks.com" target="_blank">
                www.a10networks.com
              </a>. <strong />
            </p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={this.termsAccepted}>
              Accept
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default AcceptTerms
