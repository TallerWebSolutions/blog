/**
 * Main JS file for Casper behaviours
 */
/*globals jQuery, document */
(function($) {
    "use strict";
})(jQuery);

/**
 * Post behaviors and adjustments.
 */
/*globals jQuery, document */
(function($) {
    "use strict";
    $(document).ready(function() {
        // Inform paragraph of image existence.
        $(".post-content img").closest("p").addClass("has-image");
        // Inform paragraph of code existence.
        $(".post-content code").parent("p").addClass("has-code");
        // Remove meta-data paragraph.
        $(".post-content meta").parent("p").hide();
        // Sticky header.
        (function() {
            var postMeta = $("#post-meta");
            // Apply plugin.
            postMeta.stick_in_parent({
                sticky_class: "sticked",
                brief: postMeta.outerHeight(true) * 2,
                entranceAnimation: function() {
                    $(this).fadeIn(350);
                }
            });
        })();
    });
})(jQuery);

/**
 * Adjustments to code tags with prism.
 */
/*globals jQuery, document */
(function($) {
    "use strict";
    var i, languages = [ "markup", "php", "javascript", "coffee", "css", "scss", "sass", "ruby", "sql" ];
    $("code").each(function() {
        var $code = $(this), $pre = $code.parent("pre"), codeClass = $code.attr("class") || "", preClass = $pre.attr("class") || "", languageDefined = false;
        // Add line numbers.
        $pre.addClass("line-numbers");
        for (i = 0; i < languages.length; i++) {
            if ($code.hasClass(languages[i])) {
                $code.addClass("language-" + languages[i]);
                languageDefined = true;
            }
        }
        if (!languageDefined) {
            $code.addClass("language-undefined");
            $pre.addClass("language-undefined");
        }
    });
})(jQuery);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */
(function() {
    var e = /\blang(?:uage)?-(?!\*)(\w+)\b/i, t = self.Prism = {
        util: {
            type: function(e) {
                return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1];
            },
            clone: function(e) {
                var n = t.util.type(e);
                switch (n) {
                  case "Object":
                    var r = {};
                    for (var i in e) e.hasOwnProperty(i) && (r[i] = t.util.clone(e[i]));
                    return r;

                  case "Array":
                    return e.slice();
                }
                return e;
            }
        },
        languages: {
            extend: function(e, n) {
                var r = t.util.clone(t.languages[e]);
                for (var i in n) r[i] = n[i];
                return r;
            },
            insertBefore: function(e, n, r, i) {
                i = i || t.languages;
                var s = i[e], o = {};
                for (var u in s) if (s.hasOwnProperty(u)) {
                    if (u == n) for (var a in r) r.hasOwnProperty(a) && (o[a] = r[a]);
                    o[u] = s[u];
                }
                return i[e] = o;
            },
            DFS: function(e, n) {
                for (var r in e) {
                    n.call(e, r, e[r]);
                    t.util.type(e) === "Object" && t.languages.DFS(e[r], n);
                }
            }
        },
        highlightAll: function(e, n) {
            var r = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');
            for (var i = 0, s; s = r[i++]; ) t.highlightElement(s, e === !0, n);
        },
        highlightElement: function(r, i, s) {
            var o, u, a = r;
            while (a && !e.test(a.className)) a = a.parentNode;
            if (a) {
                o = (a.className.match(e) || [ , "" ])[1];
                u = t.languages[o];
            }
            if (!u) return;
            r.className = r.className.replace(e, "").replace(/\s+/g, " ") + " language-" + o;
            a = r.parentNode;
            /pre/i.test(a.nodeName) && (a.className = a.className.replace(e, "").replace(/\s+/g, " ") + " language-" + o);
            var f = r.textContent;
            if (!f) return;
            f = f.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
            var l = {
                element: r,
                language: o,
                grammar: u,
                code: f
            };
            t.hooks.run("before-highlight", l);
            if (i && self.Worker) {
                var c = new Worker(t.filename);
                c.onmessage = function(e) {
                    l.highlightedCode = n.stringify(JSON.parse(e.data), o);
                    t.hooks.run("before-insert", l);
                    l.element.innerHTML = l.highlightedCode;
                    s && s.call(l.element);
                    t.hooks.run("after-highlight", l);
                };
                c.postMessage(JSON.stringify({
                    language: l.language,
                    code: l.code
                }));
            } else {
                l.highlightedCode = t.highlight(l.code, l.grammar, l.language);
                t.hooks.run("before-insert", l);
                l.element.innerHTML = l.highlightedCode;
                s && s.call(r);
                t.hooks.run("after-highlight", l);
            }
        },
        highlight: function(e, r, i) {
            return n.stringify(t.tokenize(e, r), i);
        },
        tokenize: function(e, n, r) {
            var i = t.Token, s = [ e ], o = n.rest;
            if (o) {
                for (var u in o) n[u] = o[u];
                delete n.rest;
            }
            e: for (var u in n) {
                if (!n.hasOwnProperty(u) || !n[u]) continue;
                var a = n[u], f = a.inside, l = !!a.lookbehind, c = 0;
                a = a.pattern || a;
                for (var h = 0; h < s.length; h++) {
                    var p = s[h];
                    if (s.length > e.length) break e;
                    if (p instanceof i) continue;
                    a.lastIndex = 0;
                    var d = a.exec(p);
                    if (d) {
                        l && (c = d[1].length);
                        var v = d.index - 1 + c, d = d[0].slice(c), m = d.length, g = v + m, y = p.slice(0, v + 1), b = p.slice(g + 1), w = [ h, 1 ];
                        y && w.push(y);
                        var E = new i(u, f ? t.tokenize(d, f) : d);
                        w.push(E);
                        b && w.push(b);
                        Array.prototype.splice.apply(s, w);
                    }
                }
            }
            return s;
        },
        hooks: {
            all: {},
            add: function(e, n) {
                var r = t.hooks.all;
                r[e] = r[e] || [];
                r[e].push(n);
            },
            run: function(e, n) {
                var r = t.hooks.all[e];
                if (!r || !r.length) return;
                for (var i = 0, s; s = r[i++]; ) s(n);
            }
        }
    }, n = t.Token = function(e, t) {
        this.type = e;
        this.content = t;
    };
    n.stringify = function(e, r, i) {
        if (typeof e == "string") return e;
        if (Object.prototype.toString.call(e) == "[object Array]") return e.map(function(t) {
            return n.stringify(t, r, e);
        }).join("");
        var s = {
            type: e.type,
            content: n.stringify(e.content, r, i),
            tag: "span",
            classes: [ "token", e.type ],
            attributes: {},
            language: r,
            parent: i
        };
        s.type == "comment" && (s.attributes.spellcheck = "true");
        t.hooks.run("wrap", s);
        var o = "";
        for (var u in s.attributes) o += u + '="' + (s.attributes[u] || "") + '"';
        return "<" + s.tag + ' class="' + s.classes.join(" ") + '" ' + o + ">" + s.content + "</" + s.tag + ">";
    };
    if (!self.document) {
        self.addEventListener("message", function(e) {
            var n = JSON.parse(e.data), r = n.language, i = n.code;
            self.postMessage(JSON.stringify(t.tokenize(i, t.languages[r])));
            self.close();
        }, !1);
        return;
    }
    var r = document.getElementsByTagName("script");
    r = r[r.length - 1];
    if (r) {
        t.filename = r.src;
        document.addEventListener && !r.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", t.highlightAll);
    }
})();

Prism.languages.markup = {
    comment: /&lt;!--[\w\W]*?-->/g,
    prolog: /&lt;\?.+?\?>/,
    doctype: /&lt;!DOCTYPE.+?>/,
    cdata: /&lt;!\[CDATA\[[\w\W]*?]]>/i,
    tag: {
        pattern: /&lt;\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|\w+))?\s*)*\/?>/gi,
        inside: {
            tag: {
                pattern: /^&lt;\/?[\w:-]+/i,
                inside: {
                    punctuation: /^&lt;\/?/,
                    namespace: /^[\w-]+?:/
                }
            },
            "attr-value": {
                pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,
                inside: {
                    punctuation: /=|>|"/g
                }
            },
            punctuation: /\/?>/g,
            "attr-name": {
                pattern: /[\w:-]+/g,
                inside: {
                    namespace: /^[\w-]+?:/
                }
            }
        }
    },
    entity: /&amp;#?[\da-z]{1,8};/gi
};

Prism.hooks.add("wrap", function(e) {
    e.type === "entity" && (e.attributes.title = e.content.replace(/&amp;/, "&"));
});

Prism.languages.css = {
    comment: /\/\*[\w\W]*?\*\//g,
    atrule: {
        pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi,
        inside: {
            punctuation: /[;:]/g
        }
    },
    url: /url\((["']?).*?\1\)/gi,
    selector: /[^\{\}\s][^\{\};]*(?=\s*\{)/g,
    property: /(\b|\B)[\w-]+(?=\s*:)/gi,
    string: /("|')(\\?.)*?\1/g,
    important: /\B!important\b/gi,
    ignore: /&(lt|gt|amp);/gi,
    punctuation: /[\{\};:]/g
};

Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    style: {
        pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/style(>|&gt;)/gi,
        inside: {
            tag: {
                pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)|(&lt;|<)\/style(>|&gt;)/gi,
                inside: Prism.languages.markup.tag.inside
            },
            rest: Prism.languages.css
        }
    }
});

Prism.languages.clike = {
    comment: {
        pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])\/\/.*?(\r?\n|$))/g,
        lookbehind: !0
    },
    string: /("|')(\\?.)*?\1/g,
    "class-name": {
        pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,
        lookbehind: !0,
        inside: {
            punctuation: /(\.|\\)/
        }
    },
    keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,
    "boolean": /\b(true|false)\b/g,
    "function": {
        pattern: /[a-z0-9_]+\(/gi,
        inside: {
            punctuation: /\(/
        }
    },
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
    operator: /[-+]{1,2}|!|&lt;=?|>=?|={1,3}|(&amp;){1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,
    ignore: /&(lt|gt|amp);/gi,
    punctuation: /[{}[\];(),.:]/g
};

Prism.languages.javascript = Prism.languages.extend("clike", {
    keyword: /\b(var|let|if|else|while|do|for|return|in|instanceof|function|new|with|typeof|try|throw|catch|finally|null|break|continue)\b/g,
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g
});

Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
        pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
        lookbehind: !0
    }
});

Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    script: {
        pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/script(>|&gt;)/gi,
        inside: {
            tag: {
                pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)|(&lt;|<)\/script(>|&gt;)/gi,
                inside: Prism.languages.markup.tag.inside
            },
            rest: Prism.languages.javascript
        }
    }
});

Prism.languages.php = Prism.languages.extend("clike", {
    keyword: /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|extends|private|protected|parent|static|throw|null|echo|print|trait|namespace|use|final|yield|goto|instanceof|finally|try|catch)\b/gi,
    constant: /\b[A-Z0-9_]{2,}\b/g
});

Prism.languages.insertBefore("php", "keyword", {
    delimiter: /(\?>|&lt;\?php|&lt;\?)/gi,
    variable: /(\$\w+)\b/gi,
    "package": {
        pattern: /(\\|namespace\s+|use\s+)[\w\\]+/g,
        lookbehind: !0,
        inside: {
            punctuation: /\\/
        }
    }
});

Prism.languages.insertBefore("php", "operator", {
    property: {
        pattern: /(->)[\w]+/g,
        lookbehind: !0
    }
});

Prism.languages.markup && (Prism.hooks.add("before-highlight", function(a) {
    "php" === a.language && (a.tokenStack = [], a.code = a.code.replace(/(?:&lt;\?php|&lt;\?|<\?php|<\?)[\w\W]*?(?:\?&gt;|\?>)/gi, function(b) {
        a.tokenStack.push(b);
        return "{{{PHP" + a.tokenStack.length + "}}}";
    }));
}), Prism.hooks.add("after-highlight", function(a) {
    if ("php" === a.language) {
        for (var b = 0, c; c = a.tokenStack[b]; b++) a.highlightedCode = a.highlightedCode.replace("{{{PHP" + (b + 1) + "}}}", Prism.highlight(c, a.grammar, "php"));
        a.element.innerHTML = a.highlightedCode;
    }
}), Prism.hooks.add("wrap", function(a) {
    "php" === a.language && "markup" === a.type && (a.content = a.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, '<span class="token php">$1</span>'));
}), Prism.languages.insertBefore("php", "comment", {
    markup: {
        pattern: /(&lt;|<)[^?]\/?(.*?)(>|&gt;)/g,
        inside: Prism.languages.markup
    },
    php: /\{\{\{PHP[0-9]+\}\}\}/g
}));

Prism.languages.coffeescript = Prism.languages.extend("javascript", {
    "block-comment": /([#]{3}\s*\r?\n(.*\s*\r*\n*)\s*?\r?\n[#]{3})/g,
    comment: /(\s|^)([#]{1}[^#^\r^\n]{2,}?(\r?\n|$))/g,
    keyword: /\b(this|window|delete|class|extends|namespace|extend|ar|let|if|else|while|do|for|each|of|return|in|instanceof|new|with|typeof|try|catch|finally|null|undefined|break|continue)\b/g
});

Prism.languages.insertBefore("coffeescript", "keyword", {
    "function": {
        pattern: /[a-z|A-z]+\s*[:|=]\s*(\([.|a-z\s|,|:|{|}|\"|\'|=]*\))?\s*-&gt;/gi,
        inside: {
            "function-name": /[_?a-z-|A-Z-]+(\s*[:|=])| @[_?$?a-z-|A-Z-]+(\s*)| /g,
            operator: /[-+]{1,2}|!|=?&lt;|=?&gt;|={1,2}|(&amp;){1,2}|\|?\||\?|\*|\//g
        }
    },
    "attr-name": /[_?a-z-|A-Z-]+(\s*:)| @[_?$?a-z-|A-Z-]+(\s*)| /g
});

Prism.languages.scss = Prism.languages.extend("css", {
    comment: {
        pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,
        lookbehind: !0
    },
    atrule: /@[\w-]+(?=\s+(\(|\{|;))/gi,
    url: /([-a-z]+-)*url(?=\()/gi,
    selector: /([^@;\{\}\(\)]?([^@;\{\}\(\)]|&amp;|\#\{\$[-_\w]+\})+)(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/gm
});

Prism.languages.insertBefore("scss", "atrule", {
    keyword: /@(if|else if|else|for|each|while|import|extend|debug|warn|mixin|include|function|return)|(?=@for\s+\$[-_\w]+\s)+from/i
});

Prism.languages.insertBefore("scss", "property", {
    variable: /((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i
});

Prism.languages.insertBefore("scss", "ignore", {
    placeholder: /%[-_\w]+/i,
    statement: /\B!(default|optional)\b/gi,
    "boolean": /\b(true|false)\b/g,
    "null": /\b(null)\b/g,
    operator: /\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|\%)\s+/g
});

Prism.languages.python = {
    comment: {
        pattern: /(^|[^\\])#.*?(\r?\n|$)/g,
        lookbehind: !0
    },
    string: /("|')(\\?.)*?\1/g,
    keyword: /\b(as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/g,
    "boolean": /\b(True|False)\b/g,
    number: /\b-?(0x)?\d*\.?[\da-f]+\b/g,
    operator: /[-+]{1,2}|=?&lt;|=?&gt;|!|={1,2}|(&){1,2}|(&amp;){1,2}|\|?\||\?|\*|\/|~|\^|%|\b(or|and|not)\b/g,
    ignore: /&(lt|gt|amp);/gi,
    punctuation: /[{}[\];(),.:]/g
};

Prism.languages.sql = {
    comment: {
        pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|((--)|(\/\/)).*?(\r?\n|$))/g,
        lookbehind: !0
    },
    string: /("|')(\\?.)*?\1/g,
    keyword: /\b(ACTION|ADD|AFTER|ALGORITHM|ALTER|ANALYZE|APPLY|AS|AS|ASC|AUTHORIZATION|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADE|CASCADED|CASE|CHAIN|CHAR VARYING|CHARACTER VARYING|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATA|DATABASE|DATABASES|DATETIME|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DOUBLE PRECISION|DROP|DUMMY|DUMP|DUMPFILE|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE|ESCAPED BY|EXCEPT|EXEC|EXECUTE|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR|FOR EACH ROW|FORCE|FOREIGN|FREETEXT|FREETEXTTABLE|FROM|FULL|FUNCTION|GEOMETRY|GEOMETRYCOLLECTION|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY|IDENTITY_INSERT|IDENTITYCOL|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEY|KEYS|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONGBLOB|LONGTEXT|MATCH|MATCHED|MEDIUMBLOB|MEDIUMINT|MEDIUMTEXT|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTILINESTRING|MULTIPOINT|MULTIPOLYGON|NATIONAL|NATIONAL CHAR VARYING|NATIONAL CHARACTER|NATIONAL CHARACTER VARYING|NATIONAL VARCHAR|NATURAL|NCHAR|NCHAR VARCHAR|NEXT|NO|NO SQL|NOCHECK|NOCYCLE|NONCLUSTERED|NULLIF|NUMERIC|OF|OFF|OFFSETS|ON|OPEN|OPENDATASOURCE|OPENQUERY|OPENROWSET|OPTIMIZE|OPTION|OPTIONALLY|ORDER|OUT|OUTER|OUTFILE|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC|PROCEDURE|PUBLIC|PURGE|QUICK|RAISERROR|READ|READS SQL DATA|READTEXT|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURN|RETURNS|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROWCOUNT|ROWGUIDCOL|ROWS?|RTREE|RULE|SAVE|SAVEPOINT|SCHEMA|SELECT|SERIAL|SERIALIZABLE|SESSION|SESSION_USER|SET|SETUSER|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START|STARTING BY|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLE|TABLES|TABLESPACE|TEMPORARY|TEMPTABLE|TERMINATED BY|TEXT|TEXTSIZE|THEN|TIMESTAMP|TINYBLOB|TINYINT|TINYTEXT|TO|TOP|TRAN|TRANSACTION|TRANSACTIONS|TRIGGER|TRUNCATE|TSEQUAL|TYPE|TYPES|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNPIVOT|UPDATE|UPDATETEXT|USAGE|USE|USER|USING|VALUE|VALUES|VARBINARY|VARCHAR|VARCHARACTER|VARYING|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH|WITH ROLLUP|WITHIN|WORK|WRITE|WRITETEXT)\b/gi,
    "boolean": /\b(TRUE|FALSE|NULL)\b/gi,
    number: /\b-?(0x)?\d*\.?[\da-f]+\b/g,
    operator: /\b(ALL|AND|ANY|BETWEEN|EXISTS|IN|LIKE|NOT|OR|IS|UNIQUE|CHARACTER SET|COLLATE|DIV|OFFSET|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b|[-+]{1}|!|=?&lt;|=?&gt;|={1}|(&amp;){1,2}|\|?\||\?|\*|\//gi,
    ignore: /&(lt|gt|amp);/gi,
    punctuation: /[;[\]()`,.]/g
};

Prism.languages.ruby = Prism.languages.extend("clike", {
    comment: /#[^\r\n]*(\r?\n|$)/g,
    keyword: /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/g,
    builtin: /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
    constant: /\b[A-Z][a-zA-Z_0-9]*[?!]?\b/g
});

Prism.languages.insertBefore("ruby", "keyword", {
    regex: {
        pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
        lookbehind: true
    },
    variable: /[@$&]+\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g,
    symbol: /:\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g
});

Prism.hooks.add("after-highlight", function(e) {
    var t = e.element.parentNode;
    if (!t || !/pre/i.test(t.nodeName) || t.className.indexOf("line-numbers") === -1) {
        return;
    }
    var n = 1 + e.code.split("\n").length;
    var r;
    lines = new Array(n);
    lines = lines.join("<span></span>");
    r = document.createElement("span");
    r.className = "line-numbers-rows";
    r.innerHTML = lines;
    if (t.hasAttribute("data-start")) {
        t.style.counterReset = "linenumber " + (parseInt(t.getAttribute("data-start"), 10) - 1);
    }
    e.element.appendChild(r);
});

// Generated by CoffeeScript 1.6.3
/**
@license Sticky-kit v1.0.2 | WTFPL | Leaf Corcoran 2013 | http://leafo.net
*/
(function() {
    var $, win;
    $ = this.jQuery;
    win = $(window);
    $.fn.stick_in_parent = function(opts) {
        var elm, inner_scrolling, offset_top, parent_selector, sticky_class, brief, entranceAnimation, _fn, _i, _len;
        if (opts == null) {
            opts = {};
        }
        sticky_class = opts.sticky_class, inner_scrolling = opts.inner_scrolling, parent_selector = opts.parent, 
        offset_top = opts.offset_top, brief = opts.brief, entranceAnimation = opts.entranceAnimation;
        if (offset_top == null) {
            offset_top = 0;
        }
        if (parent_selector == null) {
            parent_selector = void 0;
        }
        if (inner_scrolling == null) {
            inner_scrolling = true;
        }
        if (sticky_class == null) {
            sticky_class = "is_stuck";
        }
        if (brief == null) {
            brief = void 0;
        }
        if (entranceAnimation == null) {
            entranceAnimation = function() {
                $(this).show();
            };
        }
        _fn = function(elm, padding_bottom, parent_top, parent_height, top, height, float) {
            var bottomed, detach, fixed, last_pos, offset, parent, recalc, recalc_and_tick, spacer, tick;
            parent = elm.parent();
            if (parent_selector != null) {
                parent = parent.closest(parent_selector);
            }
            if (!parent.length) {
                throw "failed to find stick parent";
            }
            fixed = false;
            spacer = $("<div />");
            recalc = function() {
                var border_top, padding_top, restore;
                border_top = parseInt(parent.css("border-top-width"), 10);
                padding_top = parseInt(parent.css("padding-top"), 10);
                padding_bottom = parseInt(parent.css("padding-bottom"), 10);
                parent_top = parent.offset().top + border_top + padding_top;
                parent_height = parent.height();
                restore = fixed ? (fixed = false, elm.insertAfter(spacer).css({
                    position: "",
                    top: "",
                    width: ""
                }), spacer.detach(), true) : void 0;
                top = elm.offset().top - parseInt(elm.css("margin-top"), 10) - offset_top;
                height = elm.outerHeight(true);
                float = elm.css("float");
                spacer.css({
                    width: elm.outerWidth(true),
                    height: height,
                    display: elm.css("display"),
                    "vertical-align": elm.css("vertical-align"),
                    "float": float
                });
                if (restore) {
                    return tick();
                }
            };
            recalc();
            if (height === parent_height) {}
            bottomed = false;
            last_pos = void 0;
            offset = offset_top;
            tick = function() {
                var css, delta, scroll, will_bottom, win_height;
                scroll = win.scrollTop();
                if (last_pos != null) {
                    delta = scroll - last_pos;
                }
                last_pos = scroll;
                if (fixed) {
                    will_bottom = scroll + height + offset > parent_height + parent_top;
                    if (bottomed && !will_bottom) {
                        bottomed = false;
                        elm.css({
                            position: "fixed",
                            bottom: "",
                            top: offset
                        }).trigger("sticky_kit:unbottom");
                    }
                    if (scroll < top) {
                        fixed = false;
                        offset = offset_top;
                        if (float === "left" || float === "right") {
                            elm.insertAfter(spacer);
                        }
                        spacer.detach();
                        css = {
                            position: "",
                            width: "",
                            top: "",
                            "z-index": "",
                            opacity: 1
                        };
                        elm.css(css).removeClass(sticky_class).trigger("sticky_kit:unstick");
                    }
                    if (inner_scrolling) {
                        win_height = win.height();
                        if (height > win_height) {
                            if (!bottomed) {
                                offset -= delta;
                                offset = Math.max(win_height - height, offset);
                                offset = Math.min(offset_top, offset);
                                if (fixed) {
                                    elm.css({
                                        top: offset + "px"
                                    });
                                }
                            }
                        }
                    }
                } else {
                    if (scroll - brief > top) {
                        fixed = true;
                        css = {
                            position: "fixed",
                            top: offset,
                            "z-index": 1,
                            width: elm.width() + "px",
                            opacity: 1
                        };
                        elm.css(css).hide().addClass(sticky_class).after(spacer);
                        entranceAnimation.call(elm);
                        if (float === "left" || float === "right") {
                            spacer.append(elm);
                        }
                        elm.trigger("sticky_kit:stick");
                    }
                }
                if (fixed) {
                    if (will_bottom == null) {
                        will_bottom = scroll + height + offset > parent_height + parent_top;
                    }
                    if (!bottomed && will_bottom) {
                        bottomed = true;
                        if (parent.css("position") === "static") {
                            parent.css({
                                position: "relative"
                            });
                        }
                        return elm.css({}).trigger("sticky_kit:bottom");
                    }
                }
            };
            recalc_and_tick = function() {
                recalc();
                return tick();
            };
            detach = function() {
                win.off("scroll", tick);
                $(document.body).off("sticky_kit:recalc", recalc_and_tick);
                elm.off("sticky_kit:detach", detach);
                elm.css({
                    position: "",
                    bottom: "",
                    top: ""
                });
                parent.position("position", "");
                if (fixed) {
                    elm.insertAfter(spacer).removeClass(sticky_class);
                    return spacer.remove();
                }
            };
            win.on("scroll", tick);
            win.on("resize", recalc_and_tick);
            $(document.body).on("sticky_kit:recalc", recalc_and_tick);
            elm.on("sticky_kit:detach", detach);
            return setTimeout(tick, 0);
        };
        for (_i = 0, _len = this.length; _i < _len; _i++) {
            elm = this[_i];
            _fn($(elm));
        }
        return this;
    };
}).call(this);

/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($, e, b) {
    var c = "hashchange", h = document, f, g = $.event.special, i = h.documentMode, d = "on" + c in e && (i === b || i > 7);
    function a(j) {
        j = j || location.href;
        return "#" + j.replace(/^[^#]*#?(.*)$/, "$1");
    }
    $.fn[c] = function(j) {
        return j ? this.bind(c, j) : this.trigger(c);
    };
    $.fn[c].delay = 50;
    g[c] = $.extend(g[c], {
        setup: function() {
            if (d) {
                return false;
            }
            $(f.start);
        },
        teardown: function() {
            if (d) {
                return false;
            }
            $(f.stop);
        }
    });
    f = function() {
        var j = {}, p, m = a(), k = function(q) {
            return q;
        }, l = k, o = k;
        j.start = function() {
            p || n();
        };
        j.stop = function() {
            p && clearTimeout(p);
            p = b;
        };
        function n() {
            var r = a(), q = o(m);
            if (r !== m) {
                l(m = r, q);
                $(e).trigger(c);
            } else {
                if (q !== m) {
                    location.href = location.href.replace(/#.*/, "") + q;
                }
            }
            p = setTimeout(n, $.fn[c].delay);
        }
        $.browser && $.browser.msie && !d && function() {
            var q, r;
            j.start = function() {
                if (!q) {
                    r = $.fn[c].src;
                    r = r && r + a();
                    q = $('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
                        r || l(a());
                        n();
                    }).attr("src", r || "javascript:0").insertAfter("body")[0].contentWindow;
                    h.onpropertychange = function() {
                        try {
                            if (event.propertyName === "title") {
                                q.document.title = h.title;
                            }
                        } catch (s) {}
                    };
                }
            };
            j.stop = k;
            o = function() {
                return a(q.location.href);
            };
            l = function(v, s) {
                var u = q.document, t = $.fn[c].domain;
                if (v !== s) {
                    u.title = h.title;
                    u.open();
                    t && u.write('<script>document.domain="' + t + '"</script>');
                    u.close();
                    q.location.hash = v;
                }
            };
        }();
        return j;
    }();
})(jQuery, this);

(function($) {
    defaults = {
        feed: "/rss",
        titleClass: ".post-title",
        tagsClass: ".post-meta",
        limit: 5,
        debug: false
    };
    function RelatedPosts(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this.parseRss();
    }
    RelatedPosts.prototype.displayRelated = function(posts) {
        var self = this, count = 0;
        this._currentPostTags = this.getCurrentPostTags(this.options.tagsClass);
        var related = this.matchByTag(this._currentPostTags, posts);
        related.forEach(function(post) {
            if (count < self.options.limit) {
                $(self.element).append($('<li><a href="' + post.url + '">' + post.title + "</a></li>"));
            }
            count++;
        });
        if (count == 0) {
            $(this.element).append($("<p>No related posts were found. " + 'Check the <a href="/">index</a>.</p>'));
        }
    };
    RelatedPosts.prototype.parseRss = function(pageNum, prevId, feeds) {
        var page = pageNum || 1, prevId = prevId || "", feeds = feeds || [], self = this;
        $.ajax({
            url: this.options.feed + "/" + page,
            type: "GET"
        }).done(function(data, textStatus, xhr) {
            var curId = $(data).find("item > guid").text();
            if (curId != prevId) {
                feeds.push(data);
                self.parseRss(page + 1, curId, feeds);
            } else {
                var posts = self.getPosts(feeds);
                self.displayRelated(posts);
            }
        }).fail(function(e) {
            self.reportError(e);
        });
    };
    RelatedPosts.prototype.getCurrentPostTitle = function(titleClass) {
        if (titleClass[0] != ".") {
            titleClass = "." + titleClass;
        }
        var postTitle = $(titleClass).eq(0).text();
        if (postTitle.length < 1) {
            this.reportError("Couldn't find the post title with class: " + titleClass);
        }
        return postTitle;
    };
    RelatedPosts.prototype.getCurrentPostTags = function(tagsClass) {
        if (tagsClass[0] != ".") {
            tagsClass = "." + tagsClass;
        }
        var tags = [];
        $(tagsClass + " a").each(function() {
            tags.push($(this).text());
        });
        if (tags.length < 1) {
            this.reportError("Couldn't find any tags in this post");
        }
        return tags;
    };
    RelatedPosts.prototype.getPosts = function(feeds) {
        var posts = [], items = [];
        feeds.forEach(function(feed) {
            items = $.merge(items, $(feed).find("item"));
        });
        for (var i = 0; i < items.length; i++) {
            var item = $(items[i]);
            if (item.find("title").text() !== this.getCurrentPostTitle(this.options.titleClass)) {
                posts.push({
                    title: item.find("title").text(),
                    url: item.find("link").text(),
                    content: item.find("description").text(),
                    tags: $.map(item.find("category"), function(elem) {
                        return $(elem).text();
                    })
                });
            }
        }
        if (posts.length < 1) {
            this.reportError("Couldn't find any posts in feed: " + feed);
        }
        return posts;
    };
    RelatedPosts.prototype.matchByTag = function(postTags, posts) {
        var matches = [];
        posts.forEach(function(post) {
            var beenAdded = false;
            post.tags.forEach(function(tag) {
                postTags.forEach(function(postTag) {
                    if (postTag.toLowerCase() === tag.toLowerCase() && !beenAdded) {
                        matches.push(post);
                        beenAdded = true;
                    }
                });
            });
        });
        if (matches.length < 1) {
            this.reportError("There are no closely related posts");
        }
        return matches;
    };
    RelatedPosts.prototype.reportError = function(error) {
        if (this.options.debug) {
            $(this.element).append($("<li>" + error + "</li>"));
        }
    };
    $.fn.ghostRelated = function(options) {
        return this.each(function() {
            new RelatedPosts(this, options);
        });
    };
})(jQuery);

/**
 * Main JS file
 */
/*globals jQuery, document */
(function($) {
    "use strict";
    $(document).ready(function() {
        relatedPosts();
        initializeMasonry();
    });
    function relatedPosts() {
        var $relatedPosts = $(".related-posts");
        if ($relatedPosts.length) {
            $relatedPosts.ghostRelated({
                tagsClass: ".post-tags"
            });
        }
    }
    function initializeMasonry() {
        var container = document.querySelector("#masonry-container"), msnry = null;
        // Initialize Masonry after all images have loaded.
        if (container) {
            imagesLoaded(container, function() {
                msnry = new Masonry(container, {
                    itemSelector: ".preview",
                    isFitWidth: true,
                    gutter: 0,
                    columnWidth: container.querySelector(".preview")
                });
                msnry.layout();
            });
        }
    }
})(jQuery);