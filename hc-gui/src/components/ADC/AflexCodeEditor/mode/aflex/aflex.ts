//Aflex mode file by Jason

declare var define: any
declare var CodeMirror: any
  ; (function (mod) {
    'use strict'
    if (typeof exports === 'object' && typeof module === 'object') {
      // CommonJS
      mod(require('codemirror/lib/codemirror'))
    } else if (typeof define === 'function' && define.amd) {
      // AMD
      define(['codemirror/lib/codemirror'], mod)
    } else {
      // Plain browser env
      mod(CodeMirror)
    }
  })(function (CodeMirror: any) {
    'use strict'

    CodeMirror.defineMode('aflex', function () {
      function parseWords(origin: string, except: string, extend: string) {
        let obj: IObject = {},
          words: string[] = origin.split(' ')
        if (except) {
          const disabledWords = except.split(' ')
          words = words.filter(item => disabledWords.indexOf(item) === -1)
        }
        if (extend) {
          const extendedWords = extend.split(' ')
          extendedWords.forEach(item => {
            if (words.indexOf(item) === -1) {
              words.push(item)
            }
          })
        }
        for (let i = 0; i < words.length; ++i) {
          obj[words[i]] = true
        }
        return obj
      }

      var keywords = parseWords(
        //Origin from tcl
        'Tcl safe after append array auto_execok auto_import auto_load ' +
        'auto_mkindex auto_mkindex_old auto_qualify auto_reset bgerror ' +
        'binary break catch cd close concat continue dde eof encoding error ' +
        'eval exec exit expr fblocked fconfigure fcopy file fileevent filename ' +
        'filename flush for foreach format gets glob global history http if ' +
        'incr info interp join lappend lindex linsert list llength load lrange ' +
        'lreplace lsearch lset lsort memory msgcat namespace open package parray ' +
        'pid pkg::create pkg_mkIndex proc puts pwd re_syntax read regex regexp ' +
        'registry regsub rename resource return scan seek set socket source split ' +
        'string subst switch tcl_endOfWord tcl_findLibrary tcl_startOfNextWord ' +
        'tcl_wordBreakAfter tcl_startOfPreviousWord tcl_wordBreakBefore tcltest ' +
        'tclvars tell time trace unknown unset update uplevel upvar variable ' +
        'vwait',
        //Disabled
        'after auto_execok auto_import auto_load auto_mkindex auto_mkindex_old ' +
        'auto_qualify auto_reset bgerror cd close eof exec exit fblocked fconfigure fcopy ' +
        'file fileevent filename flush gets glob http interp load memory namespace open ' +
        'package pid pkg::create pkg_mkIndex proc pwd rename seek socket source tcl_findLibrary ' +
        'tell unknown update uplevel upvar vwait',
        //Extended for aflex
        //  GLOBAL
        'accumulate active_members active_nodes b64decode b64encode clientside clone cpu crc32 ' +
        'discard domain drop event findstr forward getfield htonl htons imid ip_ttl link_qos listen ' +
        'log md5 members node ntohl ntohs peer persist pool priority reject relate_client ' +
        'relate_server rmd160 serverside session sha1 sha256 sha384 sha512 snat snatpool ' +
        'substr switch timing virtual vlan_id table ' +
        //  DEPRECATED GLOBAL (avoid using)
        'client_addr client_port dnat http_cookie http_header http_host http_method http_uri ' +
        'http_version ip_protocol ip_tos local_addr redirect remote_addr server_addr server_port use ',
      )

      var namespaces = parseWords(
        'AES CACHE CLASS COMPRESS DB DIAMETER DNS FIX HTTP IP LB LID LINK POLICY RADIUS SSL SIP STATS TCP TIME UDP URI X509',
        '',
        '',
      )

      var commandInNS = parseWords(
        //  AES
        'AES::decrypt AES::encrypt AES::key ' +
        //  CACHE
        'CACHE::age CACHE::disable CACHE::enable CACHE::expire CACHE::headers CACHE::hits ' +
        //  CLASS
        'CLASS::exists CLASS::match CLASS::names CLASS::type ' +
        //  COMPRESS
        'COMPRESS::disable COMPRESS::enable COMPRESS::gzip ' +
        //  DB
        'DB::query DB::command ' +
        //  DIAMETER
        'DIAMETER::app_id DIAMETER::avp DIAMETER::cmd_code DIAMETER::length DIAMETER::version ' +
        //  DNS
        'DNS::len DNS::header DNS::question DNS::rr DNS::answer DNS::authority DNS::additional ' +
        'DNS::name DNS::type DNS::class DNS::ttl DNS::rdata DNS::return DNS::query DNS::cache DNS::is_dnssec DNS::opt ' +
        //  FIX
        'FIX::begin_string FIX::body_length FIX::msg_seq_num FIX::msg_type FIX::sender_compid FIX::target_compid FIX::sending_time ' +
        //  HTTP
        'HTTP::close HTTP::collect HTTP::cookie HTTP::fallback HTTP::header HTTP::host HTTP::is_keepalive HTTP::is_redirect ' +
        'HTTP::method HTTP::path HTTP::payload HTTP::query HTTP::redirect HTTP::release HTTP::request HTTP::request_num ' +
        'HTTP::retry HTTP::respond HTTP::status HTTP::stream HTTP::uri HTTP::version ' +
        //  IP
        'IP::addr IP::client_addr IP::hops IP::idle_timeout IP::local_addr IP::protocol IP::remote_addr IP::server_addr IP::stats IP::tos IP::ttl IP::version ' +
        //  LB
        'LB::down LB::server LB::status LB::reselect ' +
        //  LID
        'LID::conn_limit LID::conn_rate_limit LID::exists LID::nat_pool LID::request_limit LID::request_rate_limit LID::type ' +
        //  LINK
        'LINK::lasthop LINK::nexthop LINK::vlan_id ' +
        //  POLICY
        'POLICY::bwlist ' +
        //  RADIUS
        'RADIUS::avp RADIUS::code RADIUS::id RADIUS::length ' +
        //  SSL
        'SSL::authenticate SSL::cert SSL::cipher SSL::collect SSL::disable SSL::enable SSL::payload SSL::release SSL::renegotiate ' +
        'SSL::respond SSL::session SSL::sessionid SSL::verify_result SSL::mode SSL::template ' +
        //  SIP
        'SIP::call_id SIP::from SIP::header SIP::method SIP::respond SIP::response SIP::to SIP::uri SIP::via ' +
        //  STATS
        'STATS::get STATS::clear ' +
        //  TCP
        'TCP::bandwidth TCP::client_port TCP::close TCP::collect TCP::local_port TCP::mss TCP::notify TCP::offset TCP::payload ' +
        'TCP::release TCP::remote_port TCP::respond TCP::rtt TCP::server_port TCP::unused_port ' +
        //  TIME
        'TIME::clock ' +
        //  UDP
        'UDP::client_port UDP::local_port UDP::mss UDP::payload UDP::remote_port UDP::respond UDP::server_port UDP::unused_port ' +
        //  URI
        'URI::basename URI::decode URI::encode URI::path URI::query ' +
        //  X509
        'X509::extensions X509::hash X509::issuer X509::not_valid_after X509::not_valid_before X509::serial_number X509::signature_algorithm ' +
        'X509::subject X509::subject_public_key X509::subject_public_key_RSA_bits X509::subject_public_key_type X509::verify_cert_error_string ' +
        'X509::text X509::version X509::whole',
        '',
        '',
      )

      var controllers = parseWords(
        'if elseif else switch for foreach while break continue',
        '',
        'when',
      )

      var isOperatorChar = /[+\-*\/%=!><&\|^?:]/
      var operators = parseWords(
        '+ - * / % == != > < >= <= && || ! & | ^ << >> ? : ' +
        'and not or eq ne in ni',
        '',
        'contains ends_with equals matches matches_regex starts_with',
      )

      var events = parseWords(
        //CACHE
        'CACHE_REQUEST CACHE_RESPONSE CACHE_UPDATE ' +
        //DB
        'DB_QUERY DB_COMMAND ' +
        //DIAMETER
        'DIAMETER_REQUEST DIAMETER_ANSWER DIAMETER_REQUEST_SEND DIAMETER_ANSWER_SEND ' +
        //DNS
        'DNS_REQUEST DNS_RESPONSE ' +
        //FIX
        'FIX_REQUEST FIX_RESPONSE ' +
        //GLOBAL
        'LB_FAILED LB_SELECTED, RULE_INIT ' +
        //HTTP
        'HTTP_CLASS_SELECTED HTTP_REQUEST HTTP_REQUEST_DATA HTTP_REQUEST_SEND HTTP_RESPONSE HTTP_RESPONSE_CONTINUE HTTP_RESPONSE_DATA ' +
        //SSL
        'CLIENTSSL_CLIENTHELLO CLIENTSSL_CLIENTCERT CLIENTSSL_HANDSHAKE CLIENTSSL_DATA SERVERSSL_CLIENTHELLO_SEND SERVERSSL_SERVERHELLO SERVERSSL_HANDSHAKE SERVERSSL_DATA ' +
        //SIP
        'SIP_REQUEST SIP_REQUEST_SEND SIP_RESPONSE ' +
        //IP/TCP/UDP
        'CLIENT_ACCEPTED CLIENT_CLOSED CLIENT_DATA SERVER_CLOSED SERVER_CONNECTED SERVER_DATA',
        '',
        '',
      )

      function chain(stream: any, state: IObject, f: any) {
        state.tokenize = f
        return f(stream, state)
      }

      function tokenBase(stream: any, state: IObject) {
        var ch = stream.next()
        if (/[\(\)\[\]{}]/.test(ch)) {
          if (/[{]/.test(ch) && state.afterSet) {
            state.inString = true
            state.replaceable = false
            return chain(stream, state, tokenStringFactory('}'))
          } else if (/[\[]]/.test(ch)) {
            state.inExpression = true
          } else if (/[\]]/.test(ch)) {
            state.inExpression = false
          } else if (/[\()]/.test(ch)) {
            state.inParams = true
          } else if (/[\)]/.test(ch)) {
            state.inParams = false
          }
          return 'brace'
        } else if (/\d/.test(ch)) {
          stream.eatWhile(/[\w\.]/)
          return 'number'
        } else if (ch === '#') {
          stream.skipToEnd()
          return 'comment'
        } else if (ch === '"') {
          state.inString = true
          state.replaceable = true
          return chain(stream, state, tokenStringFactory('"'))
        } else if (
          ch === '$' &&
          stream.match(/[_a-zA-Z0-9:]/, false) &&
          stream.match(/[_a-zA-Z0-9:]/, false).length !== 0
        ) {
          stream.eatWhile(/[_a-zA-Z0-9:]/)
          return 'builtin'
        } else if (isOperatorChar.test(ch)) {
          stream.eatWhile(isOperatorChar)
          return 'operator'
        } else {
          stream.eatWhile(/[\w_\xa1-\uffff]/)
          var word = stream.current()
          if (
            namespaces &&
            namespaces.propertyIsEnumerable(word) &&
            stream.match('::', false)
          ) {
            return 'namespace'
          }
          if (events && events.propertyIsEnumerable(word)) {
            return 'event'
          }
          if (operators && operators.propertyIsEnumerable(word)) {
            return 'operator'
          }
          if (controllers && controllers.propertyIsEnumerable(word)) {
            state.afterSet = false
            return 'controller'
          }
          if (keywords && keywords.propertyIsEnumerable(word)) {
            state.afterSet = false
            if (word === 'set') {
              state.afterSet = true
            }
            return 'keyword'
          }
          return 'undefined'
        }
      }

      function tokenStringFactory(quote: string) {
        return function tokenString(stream: any, state: IObject) {
          let escaped = false,
            end = false,
            peek = stream.peek(),
            next
          while (peek != null) {
            if (
              stream.match(/^[$]{1}[_a-zA-Z0-9:]+/, false) &&
              !escaped &&
              state.replaceable
            ) {
              state.tokenize = tokenBuiltinFactory(quote)
              break
            }
            next = stream.next()
            peek = stream.peek()
            if (next === quote && !escaped) {
              end = true
              break
            }
            escaped = !escaped && next == '\\'
          }
          if (end) {
            state.tokenize = tokenBase
            state.inString = false
          }
          return 'string'
        }
      }

      function tokenBuiltinFactory(quote: string) {
        return function tokenBuiltin(stream: any, state: IObject) {
          stream.eat(/[$]{1}/)
          stream.eatWhile(/[_a-zA-Z0-9:]/)
          state.tokenize = tokenStringFactory(quote)
          return 'builtin'
        }
      }

      return {
        startState: function () {
          return {
            tokenize: tokenBase,
            afterSet: false,
            inString: false,
            replaceable: false,
            inExpression: false,
            inParams: false,
          }
        },
        token: function (stream: any, state: IObject) {
          if (stream.eatSpace()) return null
          return state.tokenize(stream, state)
        },
      }
    })
    CodeMirror.defineMIME('text/x-aflex', 'aflex')
  })
