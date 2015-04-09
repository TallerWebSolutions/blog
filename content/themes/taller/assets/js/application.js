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

/*!
 * Masonry PACKAGED v3.2.3
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */
!function(a) {
    function b() {}
    function c(a) {
        function c(b) {
            b.prototype.option || (b.prototype.option = function(b) {
                a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b));
            });
        }
        function e(b, c) {
            a.fn[b] = function(e) {
                if ("string" == typeof e) {
                    for (var g = d.call(arguments, 1), h = 0, i = this.length; i > h; h++) {
                        var j = this[h], k = a.data(j, b);
                        if (k) if (a.isFunction(k[e]) && "_" !== e.charAt(0)) {
                            var l = k[e].apply(k, g);
                            if (void 0 !== l) return l;
                        } else f("no such method '" + e + "' for " + b + " instance"); else f("cannot call methods on " + b + " prior to initialization; attempted to call '" + e + "'");
                    }
                    return this;
                }
                return this.each(function() {
                    var d = a.data(this, b);
                    d ? (d.option(e), d._init()) : (d = new c(this, e), a.data(this, b, d));
                });
            };
        }
        if (a) {
            var f = "undefined" == typeof console ? b : function(a) {
                console.error(a);
            };
            return a.bridget = function(a, b) {
                c(b), e(a, b);
            }, a.bridget;
        }
    }
    var d = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", [ "jquery" ], c) : c("object" == typeof exports ? require("jquery") : a.jQuery);
}(window), function(a) {
    function b(b) {
        var c = a.event;
        return c.target = c.target || c.srcElement || b, c;
    }
    var c = document.documentElement, d = function() {};
    c.addEventListener ? d = function(a, b, c) {
        a.addEventListener(b, c, !1);
    } : c.attachEvent && (d = function(a, c, d) {
        a[c + d] = d.handleEvent ? function() {
            var c = b(a);
            d.handleEvent.call(d, c);
        } : function() {
            var c = b(a);
            d.call(a, c);
        }, a.attachEvent("on" + c, a[c + d]);
    });
    var e = function() {};
    c.removeEventListener ? e = function(a, b, c) {
        a.removeEventListener(b, c, !1);
    } : c.detachEvent && (e = function(a, b, c) {
        a.detachEvent("on" + b, a[b + c]);
        try {
            delete a[b + c];
        } catch (d) {
            a[b + c] = void 0;
        }
    });
    var f = {
        bind: d,
        unbind: e
    };
    "function" == typeof define && define.amd ? define("eventie/eventie", f) : "object" == typeof exports ? module.exports = f : a.eventie = f;
}(window), function(a) {
    function b(a) {
        "function" == typeof a && (b.isReady ? a() : g.push(a));
    }
    function c(a) {
        var c = "readystatechange" === a.type && "complete" !== f.readyState;
        b.isReady || c || d();
    }
    function d() {
        b.isReady = !0;
        for (var a = 0, c = g.length; c > a; a++) {
            var d = g[a];
            d();
        }
    }
    function e(e) {
        return "complete" === f.readyState ? d() : (e.bind(f, "DOMContentLoaded", c), e.bind(f, "readystatechange", c), 
        e.bind(a, "load", c)), b;
    }
    var f = a.document, g = [];
    b.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", [ "eventie/eventie" ], e) : "object" == typeof exports ? module.exports = e(require("eventie")) : a.docReady = e(a.eventie);
}(window), function() {
    function a() {}
    function b(a, b) {
        for (var c = a.length; c--; ) if (a[c].listener === b) return c;
        return -1;
    }
    function c(a) {
        return function() {
            return this[a].apply(this, arguments);
        };
    }
    var d = a.prototype, e = this, f = e.EventEmitter;
    d.getListeners = function(a) {
        var b, c, d = this._getEvents();
        if (a instanceof RegExp) {
            b = {};
            for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c]);
        } else b = d[a] || (d[a] = []);
        return b;
    }, d.flattenListeners = function(a) {
        var b, c = [];
        for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
        return c;
    }, d.getListenersAsObject = function(a) {
        var b, c = this.getListeners(a);
        return c instanceof Array && (b = {}, b[a] = c), b || c;
    }, d.addListener = function(a, c) {
        var d, e = this.getListenersAsObject(a), f = "object" == typeof c;
        for (d in e) e.hasOwnProperty(d) && -1 === b(e[d], c) && e[d].push(f ? c : {
            listener: c,
            once: !1
        });
        return this;
    }, d.on = c("addListener"), d.addOnceListener = function(a, b) {
        return this.addListener(a, {
            listener: b,
            once: !0
        });
    }, d.once = c("addOnceListener"), d.defineEvent = function(a) {
        return this.getListeners(a), this;
    }, d.defineEvents = function(a) {
        for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
        return this;
    }, d.removeListener = function(a, c) {
        var d, e, f = this.getListenersAsObject(a);
        for (e in f) f.hasOwnProperty(e) && (d = b(f[e], c), -1 !== d && f[e].splice(d, 1));
        return this;
    }, d.off = c("removeListener"), d.addListeners = function(a, b) {
        return this.manipulateListeners(!1, a, b);
    }, d.removeListeners = function(a, b) {
        return this.manipulateListeners(!0, a, b);
    }, d.manipulateListeners = function(a, b, c) {
        var d, e, f = a ? this.removeListener : this.addListener, g = a ? this.removeListeners : this.addListeners;
        if ("object" != typeof b || b instanceof RegExp) for (d = c.length; d--; ) f.call(this, b, c[d]); else for (d in b) b.hasOwnProperty(d) && (e = b[d]) && ("function" == typeof e ? f.call(this, d, e) : g.call(this, d, e));
        return this;
    }, d.removeEvent = function(a) {
        var b, c = typeof a, d = this._getEvents();
        if ("string" === c) delete d[a]; else if (a instanceof RegExp) for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b]; else delete this._events;
        return this;
    }, d.removeAllListeners = c("removeEvent"), d.emitEvent = function(a, b) {
        var c, d, e, f, g = this.getListenersAsObject(a);
        for (e in g) if (g.hasOwnProperty(e)) for (d = g[e].length; d--; ) c = g[e][d], 
        c.once === !0 && this.removeListener(a, c.listener), f = c.listener.apply(this, b || []), 
        f === this._getOnceReturnValue() && this.removeListener(a, c.listener);
        return this;
    }, d.trigger = c("emitEvent"), d.emit = function(a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(a, b);
    }, d.setOnceReturnValue = function(a) {
        return this._onceReturnValue = a, this;
    }, d._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0;
    }, d._getEvents = function() {
        return this._events || (this._events = {});
    }, a.noConflict = function() {
        return e.EventEmitter = f, a;
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return a;
    }) : "object" == typeof module && module.exports ? module.exports = a : e.EventEmitter = a;
}.call(this), function(a) {
    function b(a) {
        if (a) {
            if ("string" == typeof d[a]) return a;
            a = a.charAt(0).toUpperCase() + a.slice(1);
            for (var b, e = 0, f = c.length; f > e; e++) if (b = c[e] + a, "string" == typeof d[b]) return b;
        }
    }
    var c = "Webkit Moz ms Ms O".split(" "), d = document.documentElement.style;
    "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
        return b;
    }) : "object" == typeof exports ? module.exports = b : a.getStyleProperty = b;
}(window), function(a) {
    function b(a) {
        var b = parseFloat(a), c = -1 === a.indexOf("%") && !isNaN(b);
        return c && b;
    }
    function c() {}
    function d() {
        for (var a = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, b = 0, c = g.length; c > b; b++) {
            var d = g[b];
            a[d] = 0;
        }
        return a;
    }
    function e(c) {
        function e() {
            if (!m) {
                m = !0;
                var d = a.getComputedStyle;
                if (j = function() {
                    var a = d ? function(a) {
                        return d(a, null);
                    } : function(a) {
                        return a.currentStyle;
                    };
                    return function(b) {
                        var c = a(b);
                        return c || f("Style returned " + c + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), 
                        c;
                    };
                }(), k = c("boxSizing")) {
                    var e = document.createElement("div");
                    e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", 
                    e.style.borderWidth = "1px 2px 3px 4px", e.style[k] = "border-box";
                    var g = document.body || document.documentElement;
                    g.appendChild(e);
                    var h = j(e);
                    l = 200 === b(h.width), g.removeChild(e);
                }
            }
        }
        function h(a) {
            if (e(), "string" == typeof a && (a = document.querySelector(a)), a && "object" == typeof a && a.nodeType) {
                var c = j(a);
                if ("none" === c.display) return d();
                var f = {};
                f.width = a.offsetWidth, f.height = a.offsetHeight;
                for (var h = f.isBorderBox = !(!k || !c[k] || "border-box" !== c[k]), m = 0, n = g.length; n > m; m++) {
                    var o = g[m], p = c[o];
                    p = i(a, p);
                    var q = parseFloat(p);
                    f[o] = isNaN(q) ? 0 : q;
                }
                var r = f.paddingLeft + f.paddingRight, s = f.paddingTop + f.paddingBottom, t = f.marginLeft + f.marginRight, u = f.marginTop + f.marginBottom, v = f.borderLeftWidth + f.borderRightWidth, w = f.borderTopWidth + f.borderBottomWidth, x = h && l, y = b(c.width);
                y !== !1 && (f.width = y + (x ? 0 : r + v));
                var z = b(c.height);
                return z !== !1 && (f.height = z + (x ? 0 : s + w)), f.innerWidth = f.width - (r + v), 
                f.innerHeight = f.height - (s + w), f.outerWidth = f.width + t, f.outerHeight = f.height + u, 
                f;
            }
        }
        function i(b, c) {
            if (a.getComputedStyle || -1 === c.indexOf("%")) return c;
            var d = b.style, e = d.left, f = b.runtimeStyle, g = f && f.left;
            return g && (f.left = b.currentStyle.left), d.left = c, c = d.pixelLeft, d.left = e, 
            g && (f.left = g), c;
        }
        var j, k, l, m = !1;
        return h;
    }
    var f = "undefined" == typeof console ? c : function(a) {
        console.error(a);
    }, g = [ "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth" ];
    "function" == typeof define && define.amd ? define("get-size/get-size", [ "get-style-property/get-style-property" ], e) : "object" == typeof exports ? module.exports = e(require("desandro-get-style-property")) : a.getSize = e(a.getStyleProperty);
}(window), function(a) {
    function b(a, b) {
        return a[g](b);
    }
    function c(a) {
        if (!a.parentNode) {
            var b = document.createDocumentFragment();
            b.appendChild(a);
        }
    }
    function d(a, b) {
        c(a);
        for (var d = a.parentNode.querySelectorAll(b), e = 0, f = d.length; f > e; e++) if (d[e] === a) return !0;
        return !1;
    }
    function e(a, d) {
        return c(a), b(a, d);
    }
    var f, g = function() {
        if (a.matches) return "matches";
        if (a.matchesSelector) return "matchesSelector";
        for (var b = [ "webkit", "moz", "ms", "o" ], c = 0, d = b.length; d > c; c++) {
            var e = b[c], f = e + "MatchesSelector";
            if (a[f]) return f;
        }
    }();
    if (g) {
        var h = document.createElement("div"), i = b(h, "div");
        f = i ? b : e;
    } else f = d;
    "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
        return f;
    }) : "object" == typeof exports ? module.exports = f : window.matchesSelector = f;
}(Element.prototype), function(a) {
    function b(a, b) {
        for (var c in b) a[c] = b[c];
        return a;
    }
    function c(a) {
        for (var b in a) return !1;
        return b = null, !0;
    }
    function d(a) {
        return a.replace(/([A-Z])/g, function(a) {
            return "-" + a.toLowerCase();
        });
    }
    function e(a, e, f) {
        function h(a, b) {
            a && (this.element = a, this.layout = b, this.position = {
                x: 0,
                y: 0
            }, this._create());
        }
        var i = f("transition"), j = f("transform"), k = i && j, l = !!f("perspective"), m = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "otransitionend",
            transition: "transitionend"
        }[i], n = [ "transform", "transition", "transitionDuration", "transitionProperty" ], o = function() {
            for (var a = {}, b = 0, c = n.length; c > b; b++) {
                var d = n[b], e = f(d);
                e && e !== d && (a[d] = e);
            }
            return a;
        }();
        b(h.prototype, a.prototype), h.prototype._create = function() {
            this._transn = {
                ingProperties: {},
                clean: {},
                onEnd: {}
            }, this.css({
                position: "absolute"
            });
        }, h.prototype.handleEvent = function(a) {
            var b = "on" + a.type;
            this[b] && this[b](a);
        }, h.prototype.getSize = function() {
            this.size = e(this.element);
        }, h.prototype.css = function(a) {
            var b = this.element.style;
            for (var c in a) {
                var d = o[c] || c;
                b[d] = a[c];
            }
        }, h.prototype.getPosition = function() {
            var a = g(this.element), b = this.layout.options, c = b.isOriginLeft, d = b.isOriginTop, e = parseInt(a[c ? "left" : "right"], 10), f = parseInt(a[d ? "top" : "bottom"], 10);
            e = isNaN(e) ? 0 : e, f = isNaN(f) ? 0 : f;
            var h = this.layout.size;
            e -= c ? h.paddingLeft : h.paddingRight, f -= d ? h.paddingTop : h.paddingBottom, 
            this.position.x = e, this.position.y = f;
        }, h.prototype.layoutPosition = function() {
            var a = this.layout.size, b = this.layout.options, c = {};
            b.isOriginLeft ? (c.left = this.position.x + a.paddingLeft + "px", c.right = "") : (c.right = this.position.x + a.paddingRight + "px", 
            c.left = ""), b.isOriginTop ? (c.top = this.position.y + a.paddingTop + "px", c.bottom = "") : (c.bottom = this.position.y + a.paddingBottom + "px", 
            c.top = ""), this.css(c), this.emitEvent("layout", [ this ]);
        };
        var p = l ? function(a, b) {
            return "translate3d(" + a + "px, " + b + "px, 0)";
        } : function(a, b) {
            return "translate(" + a + "px, " + b + "px)";
        };
        h.prototype._transitionTo = function(a, b) {
            this.getPosition();
            var c = this.position.x, d = this.position.y, e = parseInt(a, 10), f = parseInt(b, 10), g = e === this.position.x && f === this.position.y;
            if (this.setPosition(a, b), g && !this.isTransitioning) return void this.layoutPosition();
            var h = a - c, i = b - d, j = {}, k = this.layout.options;
            h = k.isOriginLeft ? h : -h, i = k.isOriginTop ? i : -i, j.transform = p(h, i), 
            this.transition({
                to: j,
                onTransitionEnd: {
                    transform: this.layoutPosition
                },
                isCleaning: !0
            });
        }, h.prototype.goTo = function(a, b) {
            this.setPosition(a, b), this.layoutPosition();
        }, h.prototype.moveTo = k ? h.prototype._transitionTo : h.prototype.goTo, h.prototype.setPosition = function(a, b) {
            this.position.x = parseInt(a, 10), this.position.y = parseInt(b, 10);
        }, h.prototype._nonTransition = function(a) {
            this.css(a.to), a.isCleaning && this._removeStyles(a.to);
            for (var b in a.onTransitionEnd) a.onTransitionEnd[b].call(this);
        }, h.prototype._transition = function(a) {
            if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(a);
            var b = this._transn;
            for (var c in a.onTransitionEnd) b.onEnd[c] = a.onTransitionEnd[c];
            for (c in a.to) b.ingProperties[c] = !0, a.isCleaning && (b.clean[c] = !0);
            if (a.from) {
                this.css(a.from);
                var d = this.element.offsetHeight;
                d = null;
            }
            this.enableTransition(a.to), this.css(a.to), this.isTransitioning = !0;
        };
        var q = j && d(j) + ",opacity";
        h.prototype.enableTransition = function() {
            this.isTransitioning || (this.css({
                transitionProperty: q,
                transitionDuration: this.layout.options.transitionDuration
            }), this.element.addEventListener(m, this, !1));
        }, h.prototype.transition = h.prototype[i ? "_transition" : "_nonTransition"], h.prototype.onwebkitTransitionEnd = function(a) {
            this.ontransitionend(a);
        }, h.prototype.onotransitionend = function(a) {
            this.ontransitionend(a);
        };
        var r = {
            "-webkit-transform": "transform",
            "-moz-transform": "transform",
            "-o-transform": "transform"
        };
        h.prototype.ontransitionend = function(a) {
            if (a.target === this.element) {
                var b = this._transn, d = r[a.propertyName] || a.propertyName;
                if (delete b.ingProperties[d], c(b.ingProperties) && this.disableTransition(), d in b.clean && (this.element.style[a.propertyName] = "", 
                delete b.clean[d]), d in b.onEnd) {
                    var e = b.onEnd[d];
                    e.call(this), delete b.onEnd[d];
                }
                this.emitEvent("transitionEnd", [ this ]);
            }
        }, h.prototype.disableTransition = function() {
            this.removeTransitionStyles(), this.element.removeEventListener(m, this, !1), this.isTransitioning = !1;
        }, h.prototype._removeStyles = function(a) {
            var b = {};
            for (var c in a) b[c] = "";
            this.css(b);
        };
        var s = {
            transitionProperty: "",
            transitionDuration: ""
        };
        return h.prototype.removeTransitionStyles = function() {
            this.css(s);
        }, h.prototype.removeElem = function() {
            this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [ this ]);
        }, h.prototype.remove = function() {
            if (!i || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
            var a = this;
            this.on("transitionEnd", function() {
                return a.removeElem(), !0;
            }), this.hide();
        }, h.prototype.reveal = function() {
            delete this.isHidden, this.css({
                display: ""
            });
            var a = this.layout.options;
            this.transition({
                from: a.hiddenStyle,
                to: a.visibleStyle,
                isCleaning: !0
            });
        }, h.prototype.hide = function() {
            this.isHidden = !0, this.css({
                display: ""
            });
            var a = this.layout.options;
            this.transition({
                from: a.visibleStyle,
                to: a.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: {
                    opacity: function() {
                        this.isHidden && this.css({
                            display: "none"
                        });
                    }
                }
            });
        }, h.prototype.destroy = function() {
            this.css({
                position: "",
                left: "",
                right: "",
                top: "",
                bottom: "",
                transition: "",
                transform: ""
            });
        }, h;
    }
    var f = a.getComputedStyle, g = f ? function(a) {
        return f(a, null);
    } : function(a) {
        return a.currentStyle;
    };
    "function" == typeof define && define.amd ? define("outlayer/item", [ "eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property" ], e) : "object" == typeof exports ? module.exports = e(require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property")) : (a.Outlayer = {}, 
    a.Outlayer.Item = e(a.EventEmitter, a.getSize, a.getStyleProperty));
}(window), function(a) {
    function b(a, b) {
        for (var c in b) a[c] = b[c];
        return a;
    }
    function c(a) {
        return "[object Array]" === l.call(a);
    }
    function d(a) {
        var b = [];
        if (c(a)) b = a; else if (a && "number" == typeof a.length) for (var d = 0, e = a.length; e > d; d++) b.push(a[d]); else b.push(a);
        return b;
    }
    function e(a, b) {
        var c = n(b, a);
        -1 !== c && b.splice(c, 1);
    }
    function f(a) {
        return a.replace(/(.)([A-Z])/g, function(a, b, c) {
            return b + "-" + c;
        }).toLowerCase();
    }
    function g(c, g, l, n, o, p) {
        function q(a, c) {
            if ("string" == typeof a && (a = h.querySelector(a)), !a || !m(a)) return void (i && i.error("Bad " + this.constructor.namespace + " element: " + a));
            this.element = a, this.options = b({}, this.constructor.defaults), this.option(c);
            var d = ++r;
            this.element.outlayerGUID = d, s[d] = this, this._create(), this.options.isInitLayout && this.layout();
        }
        var r = 0, s = {};
        return q.namespace = "outlayer", q.Item = p, q.defaults = {
            containerStyle: {
                position: "relative"
            },
            isInitLayout: !0,
            isOriginLeft: !0,
            isOriginTop: !0,
            isResizeBound: !0,
            isResizingContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {
                opacity: 0,
                transform: "scale(0.001)"
            },
            visibleStyle: {
                opacity: 1,
                transform: "scale(1)"
            }
        }, b(q.prototype, l.prototype), q.prototype.option = function(a) {
            b(this.options, a);
        }, q.prototype._create = function() {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), b(this.element.style, this.options.containerStyle), 
            this.options.isResizeBound && this.bindResize();
        }, q.prototype.reloadItems = function() {
            this.items = this._itemize(this.element.children);
        }, q.prototype._itemize = function(a) {
            for (var b = this._filterFindItemElements(a), c = this.constructor.Item, d = [], e = 0, f = b.length; f > e; e++) {
                var g = b[e], h = new c(g, this);
                d.push(h);
            }
            return d;
        }, q.prototype._filterFindItemElements = function(a) {
            a = d(a);
            for (var b = this.options.itemSelector, c = [], e = 0, f = a.length; f > e; e++) {
                var g = a[e];
                if (m(g)) if (b) {
                    o(g, b) && c.push(g);
                    for (var h = g.querySelectorAll(b), i = 0, j = h.length; j > i; i++) c.push(h[i]);
                } else c.push(g);
            }
            return c;
        }, q.prototype.getItemElements = function() {
            for (var a = [], b = 0, c = this.items.length; c > b; b++) a.push(this.items[b].element);
            return a;
        }, q.prototype.layout = function() {
            this._resetLayout(), this._manageStamps();
            var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            this.layoutItems(this.items, a), this._isLayoutInited = !0;
        }, q.prototype._init = q.prototype.layout, q.prototype._resetLayout = function() {
            this.getSize();
        }, q.prototype.getSize = function() {
            this.size = n(this.element);
        }, q.prototype._getMeasurement = function(a, b) {
            var c, d = this.options[a];
            d ? ("string" == typeof d ? c = this.element.querySelector(d) : m(d) && (c = d), 
            this[a] = c ? n(c)[b] : d) : this[a] = 0;
        }, q.prototype.layoutItems = function(a, b) {
            a = this._getItemsForLayout(a), this._layoutItems(a, b), this._postLayout();
        }, q.prototype._getItemsForLayout = function(a) {
            for (var b = [], c = 0, d = a.length; d > c; c++) {
                var e = a[c];
                e.isIgnored || b.push(e);
            }
            return b;
        }, q.prototype._layoutItems = function(a, b) {
            function c() {
                d.emitEvent("layoutComplete", [ d, a ]);
            }
            var d = this;
            if (!a || !a.length) return void c();
            this._itemsOn(a, "layout", c);
            for (var e = [], f = 0, g = a.length; g > f; f++) {
                var h = a[f], i = this._getItemLayoutPosition(h);
                i.item = h, i.isInstant = b || h.isLayoutInstant, e.push(i);
            }
            this._processLayoutQueue(e);
        }, q.prototype._getItemLayoutPosition = function() {
            return {
                x: 0,
                y: 0
            };
        }, q.prototype._processLayoutQueue = function(a) {
            for (var b = 0, c = a.length; c > b; b++) {
                var d = a[b];
                this._positionItem(d.item, d.x, d.y, d.isInstant);
            }
        }, q.prototype._positionItem = function(a, b, c, d) {
            d ? a.goTo(b, c) : a.moveTo(b, c);
        }, q.prototype._postLayout = function() {
            this.resizeContainer();
        }, q.prototype.resizeContainer = function() {
            if (this.options.isResizingContainer) {
                var a = this._getContainerSize();
                a && (this._setContainerMeasure(a.width, !0), this._setContainerMeasure(a.height, !1));
            }
        }, q.prototype._getContainerSize = k, q.prototype._setContainerMeasure = function(a, b) {
            if (void 0 !== a) {
                var c = this.size;
                c.isBorderBox && (a += b ? c.paddingLeft + c.paddingRight + c.borderLeftWidth + c.borderRightWidth : c.paddingBottom + c.paddingTop + c.borderTopWidth + c.borderBottomWidth), 
                a = Math.max(a, 0), this.element.style[b ? "width" : "height"] = a + "px";
            }
        }, q.prototype._itemsOn = function(a, b, c) {
            function d() {
                return e++, e === f && c.call(g), !0;
            }
            for (var e = 0, f = a.length, g = this, h = 0, i = a.length; i > h; h++) {
                var j = a[h];
                j.on(b, d);
            }
        }, q.prototype.ignore = function(a) {
            var b = this.getItem(a);
            b && (b.isIgnored = !0);
        }, q.prototype.unignore = function(a) {
            var b = this.getItem(a);
            b && delete b.isIgnored;
        }, q.prototype.stamp = function(a) {
            if (a = this._find(a)) {
                this.stamps = this.stamps.concat(a);
                for (var b = 0, c = a.length; c > b; b++) {
                    var d = a[b];
                    this.ignore(d);
                }
            }
        }, q.prototype.unstamp = function(a) {
            if (a = this._find(a)) for (var b = 0, c = a.length; c > b; b++) {
                var d = a[b];
                e(d, this.stamps), this.unignore(d);
            }
        }, q.prototype._find = function(a) {
            return a ? ("string" == typeof a && (a = this.element.querySelectorAll(a)), a = d(a)) : void 0;
        }, q.prototype._manageStamps = function() {
            if (this.stamps && this.stamps.length) {
                this._getBoundingRect();
                for (var a = 0, b = this.stamps.length; b > a; a++) {
                    var c = this.stamps[a];
                    this._manageStamp(c);
                }
            }
        }, q.prototype._getBoundingRect = function() {
            var a = this.element.getBoundingClientRect(), b = this.size;
            this._boundingRect = {
                left: a.left + b.paddingLeft + b.borderLeftWidth,
                top: a.top + b.paddingTop + b.borderTopWidth,
                right: a.right - (b.paddingRight + b.borderRightWidth),
                bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth)
            };
        }, q.prototype._manageStamp = k, q.prototype._getElementOffset = function(a) {
            var b = a.getBoundingClientRect(), c = this._boundingRect, d = n(a), e = {
                left: b.left - c.left - d.marginLeft,
                top: b.top - c.top - d.marginTop,
                right: c.right - b.right - d.marginRight,
                bottom: c.bottom - b.bottom - d.marginBottom
            };
            return e;
        }, q.prototype.handleEvent = function(a) {
            var b = "on" + a.type;
            this[b] && this[b](a);
        }, q.prototype.bindResize = function() {
            this.isResizeBound || (c.bind(a, "resize", this), this.isResizeBound = !0);
        }, q.prototype.unbindResize = function() {
            this.isResizeBound && c.unbind(a, "resize", this), this.isResizeBound = !1;
        }, q.prototype.onresize = function() {
            function a() {
                b.resize(), delete b.resizeTimeout;
            }
            this.resizeTimeout && clearTimeout(this.resizeTimeout);
            var b = this;
            this.resizeTimeout = setTimeout(a, 100);
        }, q.prototype.resize = function() {
            this.isResizeBound && this.needsResizeLayout() && this.layout();
        }, q.prototype.needsResizeLayout = function() {
            var a = n(this.element), b = this.size && a;
            return b && a.innerWidth !== this.size.innerWidth;
        }, q.prototype.addItems = function(a) {
            var b = this._itemize(a);
            return b.length && (this.items = this.items.concat(b)), b;
        }, q.prototype.appended = function(a) {
            var b = this.addItems(a);
            b.length && (this.layoutItems(b, !0), this.reveal(b));
        }, q.prototype.prepended = function(a) {
            var b = this._itemize(a);
            if (b.length) {
                var c = this.items.slice(0);
                this.items = b.concat(c), this._resetLayout(), this._manageStamps(), this.layoutItems(b, !0), 
                this.reveal(b), this.layoutItems(c);
            }
        }, q.prototype.reveal = function(a) {
            var b = a && a.length;
            if (b) for (var c = 0; b > c; c++) {
                var d = a[c];
                d.reveal();
            }
        }, q.prototype.hide = function(a) {
            var b = a && a.length;
            if (b) for (var c = 0; b > c; c++) {
                var d = a[c];
                d.hide();
            }
        }, q.prototype.getItem = function(a) {
            for (var b = 0, c = this.items.length; c > b; b++) {
                var d = this.items[b];
                if (d.element === a) return d;
            }
        }, q.prototype.getItems = function(a) {
            if (a && a.length) {
                for (var b = [], c = 0, d = a.length; d > c; c++) {
                    var e = a[c], f = this.getItem(e);
                    f && b.push(f);
                }
                return b;
            }
        }, q.prototype.remove = function(a) {
            a = d(a);
            var b = this.getItems(a);
            if (b && b.length) {
                this._itemsOn(b, "remove", function() {
                    this.emitEvent("removeComplete", [ this, b ]);
                });
                for (var c = 0, f = b.length; f > c; c++) {
                    var g = b[c];
                    g.remove(), e(g, this.items);
                }
            }
        }, q.prototype.destroy = function() {
            var a = this.element.style;
            a.height = "", a.position = "", a.width = "";
            for (var b = 0, c = this.items.length; c > b; b++) {
                var d = this.items[b];
                d.destroy();
            }
            this.unbindResize();
            var e = this.element.outlayerGUID;
            delete s[e], delete this.element.outlayerGUID, j && j.removeData(this.element, this.constructor.namespace);
        }, q.data = function(a) {
            var b = a && a.outlayerGUID;
            return b && s[b];
        }, q.create = function(a, c) {
            function d() {
                q.apply(this, arguments);
            }
            return Object.create ? d.prototype = Object.create(q.prototype) : b(d.prototype, q.prototype), 
            d.prototype.constructor = d, d.defaults = b({}, q.defaults), b(d.defaults, c), d.prototype.settings = {}, 
            d.namespace = a, d.data = q.data, d.Item = function() {
                p.apply(this, arguments);
            }, d.Item.prototype = new p(), g(function() {
                for (var b = f(a), c = h.querySelectorAll(".js-" + b), e = "data-" + b + "-options", g = 0, k = c.length; k > g; g++) {
                    var l, m = c[g], n = m.getAttribute(e);
                    try {
                        l = n && JSON.parse(n);
                    } catch (o) {
                        i && i.error("Error parsing " + e + " on " + m.nodeName.toLowerCase() + (m.id ? "#" + m.id : "") + ": " + o);
                        continue;
                    }
                    var p = new d(m, l);
                    j && j.data(m, a, p);
                }
            }), j && j.bridget && j.bridget(a, d), d;
        }, q.Item = p, q;
    }
    var h = a.document, i = a.console, j = a.jQuery, k = function() {}, l = Object.prototype.toString, m = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function(a) {
        return a instanceof HTMLElement;
    } : function(a) {
        return a && "object" == typeof a && 1 === a.nodeType && "string" == typeof a.nodeName;
    }, n = Array.prototype.indexOf ? function(a, b) {
        return a.indexOf(b);
    } : function(a, b) {
        for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
        return -1;
    };
    "function" == typeof define && define.amd ? define("outlayer/outlayer", [ "eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item" ], g) : "object" == typeof exports ? module.exports = g(require("eventie"), require("doc-ready"), require("wolfy87-eventemitter"), require("get-size"), require("desandro-matches-selector"), require("./item")) : a.Outlayer = g(a.eventie, a.docReady, a.EventEmitter, a.getSize, a.matchesSelector, a.Outlayer.Item);
}(window), function(a, b) {
    "function" == typeof define && define.amd ? define([ "outlayer/outlayer", "get-size/get-size" ], b) : "object" == typeof exports ? module.exports = b(require("outlayer"), require("get-size")) : a.Masonry = b(a.Outlayer, a.getSize);
}(window, function(a, b) {
    var c = Array.prototype.indexOf ? function(a, b) {
        return a.indexOf(b);
    } : function(a, b) {
        for (var c = 0, d = a.length; d > c; c++) {
            var e = a[c];
            if (e === b) return c;
        }
        return -1;
    }, d = a.create("masonry");
    return d.prototype._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), 
        this.measureColumns();
        var a = this.cols;
        for (this.colYs = []; a--; ) this.colYs.push(0);
        this.maxY = 0;
    }, d.prototype.measureColumns = function() {
        if (this.getContainerWidth(), !this.columnWidth) {
            var a = this.items[0], c = a && a.element;
            this.columnWidth = c && b(c).outerWidth || this.containerWidth;
        }
        var d = this.columnWidth += this.gutter, e = this.containerWidth + this.gutter, f = e / d, g = d - e % d, h = g && 1 > g ? "round" : "floor";
        f = Math[h](f), this.cols = Math.max(f, 1);
    }, d.prototype.getContainerWidth = function() {
        var a = this.options.isFitWidth ? this.element.parentNode : this.element, c = b(a);
        this.containerWidth = c && c.innerWidth;
    }, d.prototype._getItemLayoutPosition = function(a) {
        a.getSize();
        var b = a.size.outerWidth % this.columnWidth, d = b && 1 > b ? "round" : "ceil", e = Math[d](a.size.outerWidth / this.columnWidth);
        e = Math.min(e, this.cols);
        for (var f = this._getColGroup(e), g = Math.min.apply(Math, f), h = c(f, g), i = {
            x: this.columnWidth * h,
            y: g
        }, j = g + a.size.outerHeight, k = this.cols + 1 - f.length, l = 0; k > l; l++) this.colYs[h + l] = j;
        return i;
    }, d.prototype._getColGroup = function(a) {
        if (2 > a) return this.colYs;
        for (var b = [], c = this.cols + 1 - a, d = 0; c > d; d++) {
            var e = this.colYs.slice(d, d + a);
            b[d] = Math.max.apply(Math, e);
        }
        return b;
    }, d.prototype._manageStamp = function(a) {
        var c = b(a), d = this._getElementOffset(a), e = this.options.isOriginLeft ? d.left : d.right, f = e + c.outerWidth, g = Math.floor(e / this.columnWidth);
        g = Math.max(0, g);
        var h = Math.floor(f / this.columnWidth);
        h -= f % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h);
        for (var i = (this.options.isOriginTop ? d.top : d.bottom) + c.outerHeight, j = g; h >= j; j++) this.colYs[j] = Math.max(i, this.colYs[j]);
    }, d.prototype._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var a = {
            height: this.maxY
        };
        return this.options.isFitWidth && (a.width = this._getContainerFitWidth()), a;
    }, d.prototype._getContainerFitWidth = function() {
        for (var a = 0, b = this.cols; --b && 0 === this.colYs[b]; ) a++;
        return (this.cols - a) * this.columnWidth - this.gutter;
    }, d.prototype.needsResizeLayout = function() {
        var a = this.containerWidth;
        return this.getContainerWidth(), a !== this.containerWidth;
    }, d;
});

/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
(function() {
    function e() {}
    function t(e, t) {
        for (var n = e.length; n--; ) if (e[n].listener === t) return n;
        return -1;
    }
    function n(e) {
        return function() {
            return this[e].apply(this, arguments);
        };
    }
    var i = e.prototype, r = this, o = r.EventEmitter;
    i.getListeners = function(e) {
        var t, n, i = this._getEvents();
        if ("object" == typeof e) {
            t = {};
            for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n]);
        } else t = i[e] || (i[e] = []);
        return t;
    }, i.flattenListeners = function(e) {
        var t, n = [];
        for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
        return n;
    }, i.getListenersAsObject = function(e) {
        var t, n = this.getListeners(e);
        return n instanceof Array && (t = {}, t[e] = n), t || n;
    }, i.addListener = function(e, n) {
        var i, r = this.getListenersAsObject(e), o = "object" == typeof n;
        for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : {
            listener: n,
            once: !1
        });
        return this;
    }, i.on = n("addListener"), i.addOnceListener = function(e, t) {
        return this.addListener(e, {
            listener: t,
            once: !0
        });
    }, i.once = n("addOnceListener"), i.defineEvent = function(e) {
        return this.getListeners(e), this;
    }, i.defineEvents = function(e) {
        for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
        return this;
    }, i.removeListener = function(e, n) {
        var i, r, o = this.getListenersAsObject(e);
        for (r in o) o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1));
        return this;
    }, i.off = n("removeListener"), i.addListeners = function(e, t) {
        return this.manipulateListeners(!1, e, t);
    }, i.removeListeners = function(e, t) {
        return this.manipulateListeners(!0, e, t);
    }, i.manipulateListeners = function(e, t, n) {
        var i, r, o = e ? this.removeListener : this.addListener, s = e ? this.removeListeners : this.addListeners;
        if ("object" != typeof t || t instanceof RegExp) for (i = n.length; i--; ) o.call(this, t, n[i]); else for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
        return this;
    }, i.removeEvent = function(e) {
        var t, n = typeof e, i = this._getEvents();
        if ("string" === n) delete i[e]; else if ("object" === n) for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t]; else delete this._events;
        return this;
    }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function(e, t) {
        var n, i, r, o, s = this.getListenersAsObject(e);
        for (r in s) if (s.hasOwnProperty(r)) for (i = s[r].length; i--; ) n = s[r][i], 
        n.once === !0 && this.removeListener(e, n.listener), o = n.listener.apply(this, t || []), 
        o === this._getOnceReturnValue() && this.removeListener(e, n.listener);
        return this;
    }, i.trigger = n("emitEvent"), i.emit = function(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(e, t);
    }, i.setOnceReturnValue = function(e) {
        return this._onceReturnValue = e, this;
    }, i._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0;
    }, i._getEvents = function() {
        return this._events || (this._events = {});
    }, e.noConflict = function() {
        return r.EventEmitter = o, e;
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return e;
    }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e;
}).call(this), function(e) {
    function t(t) {
        var n = e.event;
        return n.target = n.target || n.srcElement || t, n;
    }
    var n = document.documentElement, i = function() {};
    n.addEventListener ? i = function(e, t, n) {
        e.addEventListener(t, n, !1);
    } : n.attachEvent && (i = function(e, n, i) {
        e[n + i] = i.handleEvent ? function() {
            var n = t(e);
            i.handleEvent.call(i, n);
        } : function() {
            var n = t(e);
            i.call(e, n);
        }, e.attachEvent("on" + n, e[n + i]);
    });
    var r = function() {};
    n.removeEventListener ? r = function(e, t, n) {
        e.removeEventListener(t, n, !1);
    } : n.detachEvent && (r = function(e, t, n) {
        e.detachEvent("on" + t, e[t + n]);
        try {
            delete e[t + n];
        } catch (i) {
            e[t + n] = void 0;
        }
    });
    var o = {
        bind: i,
        unbind: r
    };
    "function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o;
}(this), function(e, t) {
    "function" == typeof define && define.amd ? define([ "eventEmitter/EventEmitter", "eventie/eventie" ], function(n, i) {
        return t(e, n, i);
    }) : "object" == typeof exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie);
}(window, function(e, t, n) {
    function i(e, t) {
        for (var n in t) e[n] = t[n];
        return e;
    }
    function r(e) {
        return "[object Array]" === d.call(e);
    }
    function o(e) {
        var t = [];
        if (r(e)) t = e; else if ("number" == typeof e.length) for (var n = 0, i = e.length; i > n; n++) t.push(e[n]); else t.push(e);
        return t;
    }
    function s(e, t, n) {
        if (!(this instanceof s)) return new s(e, t);
        "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = o(e), 
        this.options = i({}, this.options), "function" == typeof t ? n = t : i(this.options, t), 
        n && this.on("always", n), this.getImages(), a && (this.jqDeferred = new a.Deferred());
        var r = this;
        setTimeout(function() {
            r.check();
        });
    }
    function f(e) {
        this.img = e;
    }
    function c(e) {
        this.src = e, v[e] = this;
    }
    var a = e.jQuery, u = e.console, h = u !== void 0, d = Object.prototype.toString;
    s.prototype = new t(), s.prototype.options = {}, s.prototype.getImages = function() {
        this.images = [];
        for (var e = 0, t = this.elements.length; t > e; e++) {
            var n = this.elements[e];
            "IMG" === n.nodeName && this.addImage(n);
            var i = n.nodeType;
            if (i && (1 === i || 9 === i || 11 === i)) for (var r = n.querySelectorAll("img"), o = 0, s = r.length; s > o; o++) {
                var f = r[o];
                this.addImage(f);
            }
        }
    }, s.prototype.addImage = function(e) {
        var t = new f(e);
        this.images.push(t);
    }, s.prototype.check = function() {
        function e(e, r) {
            return t.options.debug && h && u.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), 
            !0;
        }
        var t = this, n = 0, i = this.images.length;
        if (this.hasAnyBroken = !1, !i) return this.complete(), void 0;
        for (var r = 0; i > r; r++) {
            var o = this.images[r];
            o.on("confirm", e), o.check();
        }
    }, s.prototype.progress = function(e) {
        this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
        var t = this;
        setTimeout(function() {
            t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e);
        });
    }, s.prototype.complete = function() {
        var e = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = !0;
        var t = this;
        setTimeout(function() {
            if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
                var n = t.hasAnyBroken ? "reject" : "resolve";
                t.jqDeferred[n](t);
            }
        });
    }, a && (a.fn.imagesLoaded = function(e, t) {
        var n = new s(this, e, t);
        return n.jqDeferred.promise(a(this));
    }), f.prototype = new t(), f.prototype.check = function() {
        var e = v[this.img.src] || new c(this.img.src);
        if (e.isConfirmed) return this.confirm(e.isLoaded, "cached was confirmed"), void 0;
        if (this.img.complete && void 0 !== this.img.naturalWidth) return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), 
        void 0;
        var t = this;
        e.on("confirm", function(e, n) {
            return t.confirm(e.isLoaded, n), !0;
        }), e.check();
    }, f.prototype.confirm = function(e, t) {
        this.isLoaded = e, this.emit("confirm", this, t);
    };
    var v = {};
    return c.prototype = new t(), c.prototype.check = function() {
        if (!this.isChecked) {
            var e = new Image();
            n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0;
        }
    }, c.prototype.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e);
    }, c.prototype.onload = function(e) {
        this.confirm(!0, "onload"), this.unbindProxyEvents(e);
    }, c.prototype.onerror = function(e) {
        this.confirm(!1, "onerror"), this.unbindProxyEvents(e);
    }, c.prototype.confirm = function(e, t) {
        this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t);
    }, c.prototype.unbindProxyEvents = function(e) {
        n.unbind(e.target, "load", this), n.unbind(e.target, "error", this);
    }, s;
});

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