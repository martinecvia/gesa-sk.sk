//INTERSECTION
!(function () {
    "use strict";
    if ("object" == typeof window)
        if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype)
            "isIntersecting" in window.IntersectionObserverEntry.prototype ||
                Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
                    get: function () {
                        return 0 < this.intersectionRatio;
                    },
                });
        else {
            var g = window.document,
                e = [];
            (t.prototype.THROTTLE_TIMEOUT = 100),
                (t.prototype.POLL_INTERVAL = null),
                (t.prototype.USE_MUTATION_OBSERVER = !0),
                (t.prototype.observe = function (e) {
                    if (
                        !this._observationTargets.some(function (t) {
                            return t.element == e;
                        })
                    ) {
                        if (!e || 1 != e.nodeType) throw new Error("target must be an Element");
                        this._registerInstance(), this._observationTargets.push({ element: e, entry: null }), this._monitorIntersections(), this._checkForIntersections();
                    }
                }),
                (t.prototype.unobserve = function (e) {
                    (this._observationTargets = this._observationTargets.filter(function (t) {
                        return t.element != e;
                    })),
                        this._observationTargets.length || (this._unmonitorIntersections(), this._unregisterInstance());
                }),
                (t.prototype.disconnect = function () {
                    (this._observationTargets = []), this._unmonitorIntersections(), this._unregisterInstance();
                }),
                (t.prototype.takeRecords = function () {
                    var t = this._queuedEntries.slice();
                    return (this._queuedEntries = []), t;
                }),
                (t.prototype._initThresholds = function (t) {
                    var e = t || [0];
                    return (
                        Array.isArray(e) || (e = [e]),
                        e.sort().filter(function (t, e, n) {
                            if ("number" != typeof t || isNaN(t) || t < 0 || 1 < t) throw new Error("threshold must be a number between 0 and 1 inclusively");
                            return t !== n[e - 1];
                        })
                    );
                }),
                (t.prototype._parseRootMargin = function (t) {
                    var e = (t || "0px").split(/\s+/).map(function (t) {
                        var e = /^(-?\d*\.?\d+)(px|%)$/.exec(t);
                        if (!e) throw new Error("rootMargin must be specified in pixels or percent");
                        return { value: parseFloat(e[1]), unit: e[2] };
                    });
                    return (e[1] = e[1] || e[0]), (e[2] = e[2] || e[0]), (e[3] = e[3] || e[1]), e;
                }),
                (t.prototype._monitorIntersections = function () {
                    this._monitoringIntersections ||
                        ((this._monitoringIntersections = !0),
                        this.POLL_INTERVAL
                            ? (this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL))
                            : (n(window, "resize", this._checkForIntersections, !0),
                              n(g, "scroll", this._checkForIntersections, !0),
                              this.USE_MUTATION_OBSERVER &&
                                  "MutationObserver" in window &&
                                  ((this._domObserver = new MutationObserver(this._checkForIntersections)), this._domObserver.observe(g, { attributes: !0, childList: !0, characterData: !0, subtree: !0 }))));
                }),
                (t.prototype._unmonitorIntersections = function () {
                    this._monitoringIntersections &&
                        ((this._monitoringIntersections = !1),
                        clearInterval(this._monitoringInterval),
                        (this._monitoringInterval = null),
                        o(window, "resize", this._checkForIntersections, !0),
                        o(g, "scroll", this._checkForIntersections, !0),
                        this._domObserver && (this._domObserver.disconnect(), (this._domObserver = null)));
                }),
                (t.prototype._checkForIntersections = function () {
                    var h = this._rootIsInDom(),
                        c = h ? this._getRootRect() : r();
                    this._observationTargets.forEach(function (t) {
                        var e = t.element,
                            n = _(e),
                            o = this._rootContainsTarget(e),
                            i = t.entry,
                            r = h && o && this._computeTargetAndRootIntersection(e, c),
                            s = (t.entry = new a({ time: window.performance && performance.now && performance.now(), target: e, boundingClientRect: n, rootBounds: c, intersectionRect: r }));
                        i ? (h && o ? this._hasCrossedThreshold(i, s) && this._queuedEntries.push(s) : i && i.isIntersecting && this._queuedEntries.push(s)) : this._queuedEntries.push(s);
                    }, this),
                        this._queuedEntries.length && this._callback(this.takeRecords(), this);
                }),
                (t.prototype._computeTargetAndRootIntersection = function (t, e) {
                    if ("none" != window.getComputedStyle(t).display) {
                        for (var n, o, i, r, s, h, c, a, u = _(t), l = m(t), d = !1; !d; ) {
                            var p = null,
                                f = 1 == l.nodeType ? window.getComputedStyle(l) : {};
                            if ("none" == f.display) return;
                            if (
                                (l == this.root || l == g ? ((d = !0), (p = e)) : l != g.body && l != g.documentElement && "visible" != f.overflow && (p = _(l)),
                                p &&
                                    ((n = p),
                                    (o = u),
                                    void 0,
                                    (i = Math.max(n.top, o.top)),
                                    (r = Math.min(n.bottom, o.bottom)),
                                    (s = Math.max(n.left, o.left)),
                                    (h = Math.min(n.right, o.right)),
                                    (a = r - i),
                                    !(u = 0 <= (c = h - s) && 0 <= a && { top: i, bottom: r, left: s, right: h, width: c, height: a })))
                            )
                                break;
                            l = m(l);
                        }
                        return u;
                    }
                }),
                (t.prototype._getRootRect = function () {
                    var t;
                    if (this.root) t = _(this.root);
                    else {
                        var e = g.documentElement,
                            n = g.body;
                        t = { top: 0, left: 0, right: e.clientWidth || n.clientWidth, width: e.clientWidth || n.clientWidth, bottom: e.clientHeight || n.clientHeight, height: e.clientHeight || n.clientHeight };
                    }
                    return this._expandRectByRootMargin(t);
                }),
                (t.prototype._expandRectByRootMargin = function (n) {
                    var t = this._rootMarginValues.map(function (t, e) {
                            return "px" == t.unit ? t.value : (t.value * (e % 2 ? n.width : n.height)) / 100;
                        }),
                        e = { top: n.top - t[0], right: n.right + t[1], bottom: n.bottom + t[2], left: n.left - t[3] };
                    return (e.width = e.right - e.left), (e.height = e.bottom - e.top), e;
                }),
                (t.prototype._hasCrossedThreshold = function (t, e) {
                    var n = t && t.isIntersecting ? t.intersectionRatio || 0 : -1,
                        o = e.isIntersecting ? e.intersectionRatio || 0 : -1;
                    if (n !== o)
                        for (var i = 0; i < this.thresholds.length; i++) {
                            var r = this.thresholds[i];
                            if (r == n || r == o || r < n != r < o) return !0;
                        }
                }),
                (t.prototype._rootIsInDom = function () {
                    return !this.root || i(g, this.root);
                }),
                (t.prototype._rootContainsTarget = function (t) {
                    return i(this.root || g, t);
                }),
                (t.prototype._registerInstance = function () {
                    e.indexOf(this) < 0 && e.push(this);
                }),
                (t.prototype._unregisterInstance = function () {
                    var t = e.indexOf(this);
                    -1 != t && e.splice(t, 1);
                }),
                (window.IntersectionObserver = t),
                (window.IntersectionObserverEntry = a);
        }
    function a(t) {
        (this.time = t.time), (this.target = t.target), (this.rootBounds = t.rootBounds), (this.boundingClientRect = t.boundingClientRect), (this.intersectionRect = t.intersectionRect || r()), (this.isIntersecting = !!t.intersectionRect);
        var e = this.boundingClientRect,
            n = e.width * e.height,
            o = this.intersectionRect,
            i = o.width * o.height;
        this.intersectionRatio = n ? Number((i / n).toFixed(4)) : this.isIntersecting ? 1 : 0;
    }
    function t(t, e) {
        var n,
            o,
            i,
            r = e || {};
        if ("function" != typeof t) throw new Error("callback must be a function");
        if (r.root && 1 != r.root.nodeType) throw new Error("root must be an Element");
        (this._checkForIntersections =
            ((n = this._checkForIntersections.bind(this)),
            (o = this.THROTTLE_TIMEOUT),
            (i = null),
            function () {
                i =
                    i ||
                    setTimeout(function () {
                        n(), (i = null);
                    }, o);
            })),
            (this._callback = t),
            (this._observationTargets = []),
            (this._queuedEntries = []),
            (this._rootMarginValues = this._parseRootMargin(r.rootMargin)),
            (this.thresholds = this._initThresholds(r.threshold)),
            (this.root = r.root || null),
            (this.rootMargin = this._rootMarginValues
                .map(function (t) {
                    return t.value + t.unit;
                })
                .join(" "));
    }
    function n(t, e, n, o) {
        "function" == typeof t.addEventListener ? t.addEventListener(e, n, o || !1) : "function" == typeof t.attachEvent && t.attachEvent("on" + e, n);
    }
    function o(t, e, n, o) {
        "function" == typeof t.removeEventListener ? t.removeEventListener(e, n, o || !1) : "function" == typeof t.detatchEvent && t.detatchEvent("on" + e, n);
    }
    function _(t) {
        var e;
        try {
            e = t.getBoundingClientRect();
        } catch (t) {}
        return e ? ((e.width && e.height) || (e = { top: e.top, right: e.right, bottom: e.bottom, left: e.left, width: e.right - e.left, height: e.bottom - e.top }), e) : r();
    }
    function r() {
        return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
    }
    function i(t, e) {
        for (var n = e; n; ) {
            if (n == t) return !0;
            n = m(n);
        }
        return !1;
    }
    function m(t) {
        var e = t.parentNode;
        return e && 11 == e.nodeType && e.host ? e.host : e && e.assignedSlot ? e.assignedSlot.parentNode : e;
    }
})();

//GLOBAL VARS
var ismobile = /android/gi.test(navigator.appVersion) || /iphone|ipad|ipod/gi.test(navigator.appVersion) || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),
    WINsize = "",
    WINwidth = 0,
    fns = {
        //TRIGGER
        trigger: function (trigger) {
            let selector = fns.substringBefore(trigger, ";");
            var $elm = $(selector || document);
            trigger = fns.substringAfter(trigger, ";");
            let params = Array.prototype.slice.call(arguments);
            params.shift();
            $elm.trigger(trigger, ...params);
        },
        //IS INT
        isInt: function (num, start, end) {
            if (Math.floor(num) == num && $.isNumeric(num)) {
                return true;
            }
            return false;
        },
        //IS NUM BETWEEN
        intBetween: function (x, min, max) {
            return x >= min && x <= max;
        },
        //SUBSTR BEFORE
        substringBefore: function (str, end) {
            return str.substring(0, str.indexOf(end));
        },
        //SUBSTR AFTER
        substringAfter: function (str, start) {
            return str.substring(str.lastIndexOf(start) + 1);
        },
        //SUBSTR BETWEEN
        substringBetween: function (str, start, end) {
            return str.substring(str.lastIndexOf(start) + 1, str.lastIndexOf(end));
        },
        //ABOVE
        goAbove: function ($elm, offset) {
            var pos = $elm.parent()[0].getBoundingClientRect(),
                hei = $elm.outerHeight(),
                val = false,
                offset = offset || 0;

            if (pos.bottom + hei + offset > $(window).height() && pos.top - hei > offset) {
                val = true;
            }
            return val;
        },
        removeAccents: function (str) {
            var accents = "Ă€ĂĂ‚ĂĂ„Ă…Ă ĂˇĂ˘ĂŁĂ¤ĂĄĂźĂ’Ă“Ă”Ă•Ă•Ă–ĂĂ˛ĂłĂ´ĂµĂ¶Ă¸ÄŽÄŹDĹ˝dĹľĂĂ‰ĂŠĂ‹Ă¨Ă©ĂŞĂ«Ă°Ă‡Ă§ÄŚÄŤĂĂŚĂŤĂŽĂŹĂ¬Ă­Ă®ĂŻĂ™ĂšĂ›ĂśĂąĂşĂ»ĂĽÄ˝ÄąÄľÄşĂ‘Ĺ‡ĹĂ±Ĺ”Ĺ•Ĺ ĹˇĹ¤ĹĄĹ¸ĂťĂżĂ˝Ĺ˝Ĺľ";
            var accentsOut = "AAAAAAaaaaaasOOOOOOOooooooDdDZdzEEEEeeeeeCcCcDIIIIiiiiUUUUuuuuLLllNNnnRrSsTtYYyyZz";
            str = str.split("");
            var strLen = str.length;
            var i, x;
            for (i = 0; i < strLen; i++) {
                if ((x = accents.indexOf(str[i])) != -1) {
                    str[i] = accentsOut[x];
                }
            }
            return str.join("");
        },
        //TRANSITION END TYPE
        transitionEndSelect: function () {
            var t,
                el = document.createElement("fake");

            var transitions = {
                transition: "transitionend",
                OTransition: "oTransitionEnd",
                MozTransition: "transitionend",
                WebkitTransition: "webkitTransitionEnd",
            };

            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        },
        folding_toggle_slide: function ($par, $child, classname, classname_done, speed) {
            var classname = classname || "unfold",
                classname_done = classname_done || "unfold_done",
                speed = speed || 200;

            if ($par.hasClass(classname)) {
                $child.stop().slideUp(speed, function () {
                    $par.removeClass(classname_done);
                    $child.removeAttr("style");
                });
                $par.removeClass(classname);
            } else {
                $child.stop().slideDown(speed, function () {
                    $child.removeAttr("style");
                    $par.addClass(classname_done);
                });
                $par.addClass(classname);
            }
        },
        //OPEN MODAL/POPUP
        open_modal: function (options) {
            $.magnificPopup.close();

            var defaults = {
                type: "inline",
                mainClass: "mfp-modal-custom",
                fixedContentPos: true,
                overflowY: "hidden",
                modal: options.modal,
                items: {
                    src: options.modalsrc,
                },
                preloader: false,
                showCloseBtn: false,
                callbacks: {
                    beforeOpen: function () {
                        if (typeof fns[options.beforeOpen] === "function") {
                            fns[options.beforeOpen](options.beforeOpenVal);
                        }
                    },
                    open: function () {
                        if (typeof fns[options.open] === "function") {
                            fns[options.open](options.openVal);
                        }
                    },
                    beforeClose: function () {
                        if (typeof fns[options.beforeClose] === "function") {
                            fns[options.beforeClose](options.beforeCloseVal);
                        }
                    },
                    change: function () {
                        if (typeof fns[options.change] === "function") {
                        }
                    },
                },
            };

            var settings = $.extend({}, defaults, options);

            $.magnificPopup.open(settings);
        },

        //MOVIE INFO MODAL
        movieinfo_modal: function (url) {
            var $cont = $(".popup_movieinfo_inner").empty().addClass("loading_spinner"),
                template_json = Hogan.compile($("#template_popup_movieinfo").html());
            $.get(url, function (data) {
                $cont.removeClass("loading_spinner").append(template_json.render(data));
            });
        },

        //EMBED MODAL
        embed_modal: function (val) {
            var patterns = {
                    youtube: {
                        index: "youtube.com",
                        id: "v=",
                        src: "//www.youtube.com/embed/%id%?autoplay=1",
                    },
                    vimeo: {
                        index: "vimeo.com/",
                        id: "/",
                        src: "//player.vimeo.com/video/%id%?autoplay=1",
                    },
                },
                $iframe = $('<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'),
                magnificPopup = $.magnificPopup.instance,
                $cont = $(".popup_embed_iframe", magnificPopup.content);

            $.each(patterns, function () {
                if (val.indexOf(this.index) > -1) {
                    val = val.substr(val.lastIndexOf(this.id) + this.id.length, val.length);
                    val = this.src.replace("%id%", val);
                    return false;
                }
            });
            $cont.empty().append($iframe);
            $iframe[0].src = val;
        },
        //EMBED MODAL
        embed_modal_close: function (val) {
            $(".popup_embed_iframe", $.magnificPopup.instance.content).empty();
        },
    },
    transitionEndType = fns.transitionEndSelect();

//INIT
$(function () {
    var $window = $(window),
        $body = $("body"),
        $html = $("html");

    //RESIZE GLOB
    $window
        .on("resize.glob", function () {
            WINwidth = $window.width();
            WINsize = window.getComputedStyle($html[0], ":before")["content"] || "";
        })
        .trigger("resize.glob");

    //WIN RESIZE
    $window
        .on(
            "resize.resizing",
            $.debounce(250, true, function (e, param) {
                if (param !== "triggered") $body.addClass("resizing");
            })
        )
        .on(
            "resize.resizing",
            $.debounce(250, false, function (e, param) {
                if (param !== "triggered") $body.removeClass("resizing");
            })
        );

    //CLICKERs
    $(".clicker, .alt_clicker").clicker();

    //CUSTOM SELECT
    if (!ismobile) $(".input_select.js:not(.force_mobile):not(.no_desktop)").niceSelect();
    $(".input_select.js.force_mobile").niceSelect();

    //ADD REMOVE SUFFIX
    $("[data-input-suffix]")
        .on("focus", function () {
            $(this).val($.trim($(this).val().replace($(this).data("input-suffix"), "")));
            $(this).prop("type", "tel");
            $(this).select();
        })
        .on("mouseup", function (e) {
            e.preventDefault();
        })
        .on("blur", function () {
            $(this).prop("type", "text");
        })
        .on("change blur", function () {
            var val = $(this).cleanVal();

            if (val.length && !$(this).val().endsWith($(this).data("input-suffix"))) $(this).val($.trim($(this).val()) + $(this).data("input-suffix"));
        })
        .on("customload", function () {
            var val = $(this).cleanVal();
            if (val.length && $(this).data("input-suffix-onload")) {
                $(this).val($(this).val() + $(this).data("input-suffix"));
            }
        })
        .trigger("customload");

    //NUMBER INPUT
    $("[data-input-number]").each(function () {
        var $par = $(this).parent(),
            $input = $(this),
            suffix = $input.data("input-suffix") || "",
            min = $input.data("input-number-min"),
            max = $input.data("input-number-max");

        $(".up", $par).on("click", function () {
            var val = $input.val().replace(suffix, "");
            if (!fns.isInt(val)) val = min;
            val = parseInt(val);
            if (val >= max) return false;
            $input.val(val + 1 + suffix);
        });

        $(".down", $par).on("click", function () {
            var val = $input.val().replace(suffix, "");
            if (!fns.isInt(val)) val = min;

            val = parseInt(val);

            if (val <= min) {
                $input.val(min + suffix);
            } else {
                $input.val(val - 1 + suffix);
            }
        });

        $input.on("change blur", function () {
            var val = $(this).val().replace(suffix, "");
            if (!fns.isInt(val)) val = min;
            val = parseInt(val);
            if (val <= min) {
                $(this).val(min + suffix);
                return false;
            }
            if (val >= max) $(this).val(max + suffix);
        });
    });

    //FOCUS SELECT
    $(".focus_select")
        .on("focus", function () {
            $(this).select();
        })
        .on("mouseup", function (e) {
            e.preventDefault();
        });

    //ADD CLASS TO ELEMENT
    $("[data-click-addclass]").on("click", function (e) {
        e.preventDefault();
        $($(this).data("click-addclass-elm")).addClass($(this).data("click-addclass"));
    });

    //REMOVE CLASS FROM ELEMENT
    $("[data-click-removeclass]").on("click", function (e) {
        e.preventDefault();
        $($(this).data("click-removeclass-elm")).removeClass($(this).data("click-removeclass"));
    });

    //TOGGLE CLASS
    $("[data-click-toggleclass]").on("click", function (e) {
        e.preventDefault();
        $($(this).data("click-toggleclass-elm")).toggleClass($(this).data("click-toggleclass"));
    });

    //TOGGLE SELF CLASS
    $("[data-click-toggleself]").on("click", function (e) {
        e.preventDefault();
        $(this).toggleClass($(this).data("click-toggleself"));
    });

    //REMOVE ELEMENT
    $("[data-click-removeelm]").on("click", function (e) {
        e.preventDefault();
        $($(this).data("click-removeelm")).remove();
    });

    //CLICK TRIGGER ELEMENT
    $("[data-click-trigger]").on("click", function (e) {
        e.preventDefault();
        window.fns.trigger($(this).data("click-trigger"));
    });

    //CLICK FOCUS
    $("[data-click-focus]").on("click", function (e) {
        e.preventDefault();
        $($(this).data("click-focus")).focus();
        $($(this).data("click-focus")).select();
    });

    //TOGGLE CHILD FOLDING
    $("[data-unfold-child]").on("click", function (e) {
        var $this = $(this),
            $par = $this.closest($this.data("unfold-parent")),
            $child = $par.find($this.data("unfold-child")),
            folding_type = "folding_toggle_" + ($this.data("unfold-type") || "slide"),
            limit = $this.data("unfold-limit");

        if (limit) {
            if (~limit.indexOf("mobile") && ~WINsize.indexOf("mobile")) {
                e.preventDefault();
                fns[folding_type]($par, $child, "unfold");
            }

            if (~limit.indexOf("tablet") && ~WINsize.indexOf("tablet")) {
                e.preventDefault();
                fns[folding_type]($par, $child, "unfold");
            }
        } else {
            e.preventDefault();
            fns[folding_type]($par, $child);
        }
    });

    //TOOLTIP
    $(".tooltip").tooltipster({
        maxWidth: 255,
        animationDuration: 100,
        delay: 100,
        interactive: true,
        trigger: "custom",
        triggerOpen: {
            mouseenter: true,
            tap: true,
        },
        triggerClose: {
            mouseleave: true,
            tap: true,
            scroll: true,
        },
    });

    //VIDEO IN IFRAME
    $("[data-video-iframe]").on("click", function (e) {
        e.preventDefault();
        var vid = $(this)
            .data("video-iframe")
            .substr($(this).data("video-iframe").lastIndexOf("v=") + 2, $(this).data("video-iframe").length);
        $(this).replaceWith('<div class="video"><iframe frameborder="0" scrolling="no" src="//www.youtube.com/embed/' + vid + '?autoplay=1"></iframe></div>');
    });

    //SCROLL HORIZONTAL DRAGGABLE
    $(".scroll_horizontal").each(function () {
        var $this = $(this),
            sx,
            x,
            move,
            sleft,
            clicked = false,
            rect = $this[0].getBoundingClientRect();

        $this.on({
            mousemove: function (e) {
                e.preventDefault();
                if (clicked) {
                    x = e.pageX - $(this)[0].offsetLeft;
                    //x    = e.clientX - rect.left;
                    move = (x - sx) * 1.5;
                    $this[0].scrollLeft = sleft - move;
                } else return;
            },
            mousedown: function (e) {
                e.preventDefault();
                clicked = true;
                sx = e.pageX - $this[0].offsetLeft;
                //sx = e.clientX - rect.left;
                sleft = $this[0].scrollLeft;
            },
            mouseup: function (e) {
                e.preventDefault();
                clicked = false;
            },
            mouseleave: function (e) {
                e.preventDefault();
                clicked = false;
            },
        });

        if ($this.data("scrollto-horizontal")) {
            var $elm = $($this.data("scrollto-horizontal"), $this);
            if ($elm.length) {
                $this[0].scrollLeft = 0;
                setTimeout(function () {
                    $this[0].scrollLeft = $elm.offset().left + $elm.width() / 2 - $window.width() / 2;
                }, 1);
            }
        }
    });

    //AUTOCOMPLETE
    $(".input_autocomplete").each(function () {
        var $this = $(this);

        $this.autocomplete({
            serviceUrl: $this.data("autocomplete-url"),
            appendTo: $($this.data("autocomplete-appendto")),
            zIndex: $this.data("autocomplete-zindex") || 200,
            beforeRender: function (container) {
                container.removeClass("above");
                if (fns.goAbove(container, 20)) {
                    container.addClass("above");
                }
            },
        });
    });

    /**INPUT LABEL**/
    $("[data-input-noempty-enable]").on("input", function () {
        if ($.trim($(this).val()).length) {
            $($(this).data("input-noempty-enable")).prop("disabled", false);
        } else {
            $($(this).data("input-noempty-enable")).prop("disabled", true);
        }
    });

    /**INPUT LABEL**/
    $(".input_file").on("change", function () {
        var filez = $(this)[0].files || false,
            $val = $(this).parent().addClass("input").find(".input_file_val");

        if (!filez) {
            $val.html($(this).val());
            return;
        }

        if (filez.length > 0) {
            $val.html(
                $.map(filez, function (e) {
                    return e["name"];
                }).join(", ")
            ).addClass("active");
        } else {
            $val.removeClass("active").html($(this).data("placeholder"));
            $(this).parent().removeClass("input");
        }
    });

    //PAIR SELECT WITH RADIO
    $("[data-radiopair]").on("change", function (e) {
        $('input[name="' + $(this).data("radiopair") + '"][value="' + $(this).val() + '"]').prop("checked", true);
    });

    //PAIR RADIO WITH SELECT
    $("[data-selectpair]").on("change", function (e) {
        $('select[name="' + $(this).data("selectpair") + '"]').val($(this).val());
    });

    //OPEN MODAL
    $("body").on("click", "[data-modal-open]", function (e) {
        e.preventDefault();
        var $this = $(this),
            obj = {};

        if ($(this).data("modal-multiple")) {
            e.stopPropagation();
        }

        obj.modalsrc = $this.data("modal-open");
        obj.modaltype = $this.data("modal-type") || null;
        obj.modal = typeof $this.data("modal-bgclick") !== "undefined" ? !$this.data("modal-bgclick") : false;
        obj.beforeOpen = $this.data("modal-onbeforeopen") || null;
        obj.beforeOpenVal = $this.data("modal-onbeforeopen-value") || null;
        obj.change = $this.data("modal-onchange") || null;
        obj.changeVal = $this.data("modal-onchange-value") || null;
        obj.open = $this.data("modal-onopen") || null;
        obj.openVal = $this.data("modal-onopen-value") || null;
        obj.beforeClose = $this.data("modal-onbeforeclose") || null;
        obj.beforeCloseVal = $this.data("modal-onbeforeclose-value") || null;

        fns.open_modal(obj);
        $window.trigger("resize", ["triggered"]);
    });

    //CLOSE MODAL
    $("body").on("click", ".modal_close", function (e) {
        e.preventDefault();
        $.magnificPopup.close();
        $window.trigger("resize", ["triggered"]);
    });

    //STOP PROP
    $("[data-stoppropagation]").on("click", function (e) {
        e.stopPropagation();
    });

    //CHECK GROUP
    $("[data-check-group]").each(function () {
        var $this = $(this),
            $lead = $($this.data("check-group-lead"), $this),
            $group = $($this.data("check-group"), $this);

        $lead.on("change", function () {
            $group.prop("checked", $lead.prop("checked"));
        });

        $group.on("change", function () {
            var checked = true;
            $group.each(function () {
                if (!$(this).prop("checked")) {
                    checked = false;
                    return false;
                }
            });
            $lead.prop("checked", checked);
        });
    });

    //CHECK GROUP
    $("[data-password-toggle]").each(function () {
        var $this = $(this),
            $btn = $($this.data("password-toggle"), $this),
            $input = $($this.data("password-toggle-input"), $this);

        $btn.on("click", function (e) {
            if ($this.hasClass("switched")) {
                $this.removeClass("switched");
                $input[0].type = "password";
            } else {
                $this.addClass("switched");
                $input[0].type = "text";
                $input.focus();
            }
        });
    });
});

/* Trigger all*/
(function ($) {
    $.fn.extend({
        triggerAll: function (events, params) {
            var el = this,
                i,
                evts = events.split(" ");
            for (i = 0; i < evts.length; i += 1) {
                el.trigger(evts[i], params);
            }
            return el;
        },
    });
})(jQuery);

/*CLICKER PLUGIN*/
(function ($) {
    $.fn.clicker = function (method) {
        this.each(function () {
            create_clicker($(this));
        });

        function create_clicker($elm) {
            var prefix = "clicker-",
                $par = $elm.data(prefix + "closest") ? $elm.closest($elm.data(prefix + "closest")) : $elm.parent(),
                cremove = $par.data(prefix + "rmclass") || false,
                $cremove_elm = cremove && $par.data(prefix + "rmclass-elm") ? $($par.data(prefix + "rmclass-elm")) : [],
                $above_elm = $elm.data(prefix + "above-elm") ? $par.find($elm.data(prefix + "above-elm")) : [];

            $elm.on("click.clicker", function (e) {
                e.preventDefault();

                if ($par.hasClass("cactive")) {
                    //REMOVE CALLBACK
                    if ($par.data(prefix + "rm-callback")) window[$par.data(prefix + "rm-callback")]();

                    $par.removeClass("cactive cshow cabove");

                    $(document).off("mouseup.clicker");

                    if (cremove) {
                        if ($cremove_elm.length) $cremove_elm.removeClass(cremove.replace(/[.,]/g, " "));
                        else $(cremove, $par).removeClass(cremove.replace(/[.,]/g, " "));
                    }
                } else {
                    //ADD CALLBACK
                    if ($par.data(prefix + "add-callback")) window[$par.data(prefix + "add-callback")]();

                    $par.addClass("cactive");

                    //TEST ABOVE
                    if ($above_elm.length && fns.goAbove($above_elm, $elm.data(prefix + "above-offset"))) $par.addClass("cabove");

                    $par.removeClass("cactive");
                    $par.outerHeight();
                    $par.addClass("cactive");

                    setTimeout(function () {
                        $par.addClass("cshow");
                        if ($elm.data("focus")) {
                            $($elm.data("focus")).focus();
                        }
                    }, 10);

                    $(document).on("mouseup.clicker", function (e) {
                        if (!$par.is(e.target) && $par.has(e.target).length === 0) {
                            $par.removeClass("cactive cshow cabove");

                            $(document).off("mouseup.clicker");

                            if ($par.data(prefix + "rm-callback")) window[$par.data(prefix + "rm-callback")]();

                            if (cremove) $(cremove, $par).removeClass(cremove.replace(/[.,]/g, " "));
                        }
                    });
                }
            });
        }
    };
})(jQuery);

/*  jQuery Nice Select - v1.0
https://github.com/hernansartorio/jquery-nice-select
Made by HernĂˇn Sartorio  */

(function ($) {
    $.fn.niceSelect = function (method) {
        // Methods
        if (typeof method == "string") {
            if (method == "update") {
                this.each(function () {
                    var $select = $(this);
                    var $dropdown = $(this).next(".nice-select");
                    var open = $dropdown.hasClass("open");

                    if ($dropdown.length) {
                        $dropdown.remove();
                        create_nice_select($select);

                        if (open) {
                            $select.next().trigger("click");
                        }
                    }
                });
            } else if (method == "destroy") {
                this.each(function () {
                    var $select = $(this);
                    var $dropdown = $(this).next(".nice-select");

                    if ($dropdown.length) {
                        $dropdown.remove();
                        $select.css("display", "");
                    }
                });
                if ($(".nice-select").length == 0) {
                    $(document).off(".nice_select");
                }
            }
            return this;
        }

        // Create custom markup
        this.each(function () {
            create_nice_select($(this));
        });

        function create_nice_select($select) {
            $select.parent().addClass("nice-select-ready");
            $select.after(
                $("<div></div>")
                    .addClass("nice-select")
                    .addClass($select.attr("class") || "")
                    .addClass($select.attr("disabled") ? "disabled" : "")
                    .attr("tabindex", $select.attr("disabled") ? null : "0")
                    .html('<span class="current"></span><ul class="list"></ul>')
            );

            var $dropdown = $select.next();
            var $options = $select.find("option");
            var $selected = $select.find("option:selected");

            $options.each(function () {
                var $option = $(this);
                var display = $option.data("display");
                var $par = $dropdown.find("ul"),
                    optiontext = $option.text(),
                    $elm = $();

                $elm = $("<li></li>").appendTo($par);
                $elm.attr("data-value", $option.val())
                    .attr("data-display", display || null)
                    .addClass("option" + ($option.is(":selected") ? " selected" : "") + ($option.is(":disabled") ? " disabled" : "") + ($option.hasClass("placeholder") ? " placeholder" : ""))
                    .html('<span class="option-text">' + optiontext + "</span>");
            });

            var $cur = $dropdown.find(".current").html($selected.data("display") || $selected.text());

            if ($selected.hasClass("placeholder")) {
                $cur.addClass("placeholder");
            } else {
                $cur.removeClass("placeholder");
            }
        }

        /**ABOVE?*/
        function goAbove($dropdown, $list, $elm) {
            var pos = $dropdown[0].getBoundingClientRect(),
                hei = $list.outerHeight(),
                pos_list = $list[0].getBoundingClientRect(),
                bottom = pos.bottom,
                top = pos.top,
                offset = Math.abs(pos.bottom - pos_list.top);

            if (bottom + hei + offset > $(window).height() && top - hei > offset) {
                $dropdown.addClass("above");
            }
        }

        // Open/close
        $(document)
            .off(".nice_select")
            .on("click.nice_select", ".nice-select:not(.disabled)", function () {
                var $dropdown = $(this);

                $(".nice-select").not($dropdown).removeClass("open above");
                $dropdown.toggleClass("open").removeClass("above");

                goAbove($dropdown, $dropdown.find(".list"));

                if ($dropdown.hasClass("open")) {
                    $dropdown.find(".option");
                    $dropdown.find(".focus").removeClass("focus");
                    $dropdown.find(".selected").addClass("focus");
                } else {
                    $dropdown.focus();
                }
            });

        // Close when clicking outside
        $(document).on("click.nice_select", function (event) {
            if ($(event.target).closest(".nice-select").length === 0) {
                $(".nice-select").removeClass("open above").find(".option");
            }
        });

        // Option click
        $(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function () {
            var $option = $(this);
            var $dropdown = $option.closest(".nice-select");

            $dropdown.find(".selected").removeClass("selected");
            $option.addClass("selected");

            var text = $option.data("display") || $option.find(".option-text").text();
            var $cur = $dropdown.find(".current");
            $cur.text(text);

            if ($option.hasClass("placeholder")) {
                $cur.addClass("placeholder");
            } else {
                $cur.removeClass("placeholder");
            }

            $dropdown.prev("select").val($option.data("value")).triggerAll("change input");
        });

        // Keyboard events
        $(document).on("keydown.nice_select", ".nice-select", function (event) {
            var $dropdown = $(this);
            var $focused_option = $($dropdown.find(".focus") || $dropdown.find(".list .option.selected"));

            // Space or Enter
            if (event.keyCode == 32 || event.keyCode == 13) {
                if ($dropdown.hasClass("open")) {
                    $focused_option.trigger("click");
                } else {
                    $dropdown.trigger("click");
                }
                return false;
                // Down
            } else if (event.keyCode == 40) {
                if (!$dropdown.hasClass("open")) {
                    $dropdown.trigger("click");
                } else {
                    var $next = $focused_option.nextAll(".option:not(.disabled)").first();
                    if ($next.length > 0) {
                        $dropdown.find(".focus").removeClass("focus");
                        $next.addClass("focus");
                    }
                }
                return false;
                // Up
            } else if (event.keyCode == 38) {
                if (!$dropdown.hasClass("open")) {
                    $dropdown.trigger("click");
                } else {
                    var $prev = $focused_option.prevAll(".option:not(.disabled)").first();
                    if ($prev.length > 0) {
                        $dropdown.find(".focus").removeClass("focus");
                        $prev.addClass("focus");
                    }
                }
                return false;
                // Esc
            } else if (event.keyCode == 27) {
                if ($dropdown.hasClass("open")) {
                    $dropdown.trigger("click");
                }
                // Tab
            } else if (event.keyCode == 9) {
                if ($dropdown.hasClass("open")) {
                    return false;
                }
            }
        });

        return this;
    };
})(jQuery);

/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function (b, c) {
    var $ = b.jQuery || b.Cowboy || (b.Cowboy = {}),
        a;
    $.throttle = a = function (e, f, j, i) {
        var h,
            d = 0;
        if (typeof f !== "boolean") {
            i = j;
            j = f;
            f = c;
        }
        function g() {
            var o = this,
                m = +new Date() - d,
                n = arguments;
            function l() {
                d = +new Date();
                j.apply(o, n);
            }
            function k() {
                h = c;
            }
            if (i && !h) {
                l();
            }
            h && clearTimeout(h);
            if (i === c && m > e) {
                l();
            } else {
                if (f !== true) {
                    h = setTimeout(i ? k : l, i === c ? e - m : e);
                }
            }
        }
        if ($.guid) {
            g.guid = j.guid = j.guid || $.guid++;
        }
        return g;
    };
    $.debounce = function (d, e, f) {
        return f === c ? a(d, e, false) : a(d, f, e !== false);
    };
})(this);

// jQuery Mask Plugin v1.14.12
// github.com/igorescobar/jQuery-Mask-Plugin
var $jscomp = {
    scope: {},
    findInternal: function (a, l, d) {
        a instanceof String && (a = String(a));
        for (var p = a.length, h = 0; h < p; h++) {
            var b = a[h];
            if (l.call(d, b, h, a)) return { i: h, v: b };
        }
        return { i: -1, v: void 0 };
    },
};
$jscomp.defineProperty =
    "function" == typeof Object.defineProperties
        ? Object.defineProperty
        : function (a, l, d) {
              if (d.get || d.set) throw new TypeError("ES3 does not support getters and setters.");
              a != Array.prototype && a != Object.prototype && (a[l] = d.value);
          };
$jscomp.getGlobal = function (a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (a, l, d, p) {
    if (l) {
        d = $jscomp.global;
        a = a.split(".");
        for (p = 0; p < a.length - 1; p++) {
            var h = a[p];
            h in d || (d[h] = {});
            d = d[h];
        }
        a = a[a.length - 1];
        p = d[a];
        l = l(p);
        l != p && null != l && $jscomp.defineProperty(d, a, { configurable: !0, writable: !0, value: l });
    }
};
$jscomp.polyfill(
    "Array.prototype.find",
    function (a) {
        return a
            ? a
            : function (a, d) {
                  return $jscomp.findInternal(this, a, d).v;
              };
    },
    "es6-impl",
    "es3"
);
(function (a, l, d) {
    "function" === typeof define && define.amd ? define(["jquery"], a) : "object" === typeof exports ? (module.exports = a(require("jquery"))) : a(l || d);
})(
    function (a) {
        var l = function (b, e, f) {
            var c = {
                invalid: [],
                getCaret: function () {
                    try {
                        var a,
                            r = 0,
                            g = b.get(0),
                            e = document.selection,
                            f = g.selectionStart;
                        if (e && -1 === navigator.appVersion.indexOf("MSIE 10")) (a = e.createRange()), a.moveStart("character", -c.val().length), (r = a.text.length);
                        else if (f || "0" === f) r = f;
                        return r;
                    } catch (C) {}
                },
                setCaret: function (a) {
                    try {
                        if (b.is(":focus")) {
                            var c,
                                g = b.get(0);
                            g.setSelectionRange ? g.setSelectionRange(a, a) : ((c = g.createTextRange()), c.collapse(!0), c.moveEnd("character", a), c.moveStart("character", a), c.select());
                        }
                    } catch (B) {}
                },
                events: function () {
                    b.on("keydown.mask", function (a) {
                        b.data("mask-keycode", a.keyCode || a.which);
                        b.data("mask-previus-value", b.val());
                        b.data("mask-previus-caret-pos", c.getCaret());
                        c.maskDigitPosMapOld = c.maskDigitPosMap;
                    })
                        .on(a.jMaskGlobals.useInput ? "input.mask" : "keyup.mask", c.behaviour)
                        .on("paste.mask drop.mask", function () {
                            setTimeout(function () {
                                b.keydown().keyup();
                            }, 100);
                        })
                        .on("change.mask", function () {
                            b.data("changed", !0);
                        })
                        .on("blur.mask", function () {
                            d === c.val() || b.data("changed") || b.trigger("change");
                            b.data("changed", !1);
                        })
                        .on("blur.mask", function () {
                            d = c.val();
                        })
                        .on("focus.mask", function (b) {
                            !0 === f.selectOnFocus && a(b.target).select();
                        })
                        .on("focusout.mask", function () {
                            f.clearIfNotMatch && !h.test(c.val()) && c.val("");
                        });
                },
                getRegexMask: function () {
                    for (var a = [], b, c, f, n, d = 0; d < e.length; d++)
                        (b = m.translation[e.charAt(d)])
                            ? ((c = b.pattern.toString().replace(/.{1}$|^.{1}/g, "")), (f = b.optional), (b = b.recursive) ? (a.push(e.charAt(d)), (n = { digit: e.charAt(d), pattern: c })) : a.push(f || b ? c + "?" : c))
                            : a.push(e.charAt(d).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
                    a = a.join("");
                    n && (a = a.replace(new RegExp("(" + n.digit + "(.*" + n.digit + ")?)"), "($1)?").replace(new RegExp(n.digit, "g"), n.pattern));
                    return new RegExp(a);
                },
                destroyEvents: function () {
                    b.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "));
                },
                val: function (a) {
                    var c = b.is("input") ? "val" : "text";
                    if (0 < arguments.length) {
                        if (b[c]() !== a) b[c](a);
                        c = b;
                    } else c = b[c]();
                    return c;
                },
                calculateCaretPosition: function () {
                    var a = b.data("mask-previus-value") || "",
                        e = c.getMasked(),
                        g = c.getCaret();
                    if (a !== e) {
                        var f = b.data("mask-previus-caret-pos") || 0,
                            e = e.length,
                            d = a.length,
                            m = (a = 0),
                            h = 0,
                            l = 0,
                            k;
                        for (k = g; k < e && c.maskDigitPosMap[k]; k++) m++;
                        for (k = g - 1; 0 <= k && c.maskDigitPosMap[k]; k--) a++;
                        for (k = g - 1; 0 <= k; k--) c.maskDigitPosMap[k] && h++;
                        for (k = f - 1; 0 <= k; k--) c.maskDigitPosMapOld[k] && l++;
                        g > d ? (g = 10 * e) : f >= g && f !== d ? c.maskDigitPosMapOld[g] || ((f = g), (g = g - (l - h) - a), c.maskDigitPosMap[g] && (g = f)) : g > f && (g = g + (h - l) + m);
                    }
                    return g;
                },
                behaviour: function (f) {
                    f = f || window.event;
                    c.invalid = [];
                    var e = b.data("mask-keycode");
                    if (-1 === a.inArray(e, m.byPassKeys)) {
                        var e = c.getMasked(),
                            g = c.getCaret();
                        setTimeout(function () {
                            c.setCaret(c.calculateCaretPosition());
                        }, 10);
                        c.val(e);
                        c.setCaret(g);
                        return c.callbacks(f);
                    }
                },
                getMasked: function (a, b) {
                    var g = [],
                        d = void 0 === b ? c.val() : b + "",
                        n = 0,
                        h = e.length,
                        q = 0,
                        l = d.length,
                        k = 1,
                        r = "push",
                        p = -1,
                        t = 0,
                        y = [],
                        v,
                        z;
                    f.reverse
                        ? ((r = "unshift"),
                          (k = -1),
                          (v = 0),
                          (n = h - 1),
                          (q = l - 1),
                          (z = function () {
                              return -1 < n && -1 < q;
                          }))
                        : ((v = h - 1),
                          (z = function () {
                              return n < h && q < l;
                          }));
                    for (var A; z(); ) {
                        var x = e.charAt(n),
                            w = d.charAt(q),
                            u = m.translation[x];
                        if (u)
                            w.match(u.pattern)
                                ? (g[r](w), u.recursive && (-1 === p ? (p = n) : n === v && (n = p - k), v === p && (n -= k)), (n += k))
                                : w === A
                                ? (t--, (A = void 0))
                                : u.optional
                                ? ((n += k), (q -= k))
                                : u.fallback
                                ? (g[r](u.fallback), (n += k), (q -= k))
                                : c.invalid.push({ p: q, v: w, e: u.pattern }),
                                (q += k);
                        else {
                            if (!a) g[r](x);
                            w === x ? (y.push(q), (q += k)) : ((A = x), y.push(q + t), t++);
                            n += k;
                        }
                    }
                    d = e.charAt(v);
                    h !== l + 1 || m.translation[d] || g.push(d);
                    g = g.join("");
                    c.mapMaskdigitPositions(g, y, l);
                    return g;
                },
                mapMaskdigitPositions: function (a, b, e) {
                    a = f.reverse ? a.length - e : 0;
                    c.maskDigitPosMap = {};
                    for (e = 0; e < b.length; e++) c.maskDigitPosMap[b[e] + a] = 1;
                },
                callbacks: function (a) {
                    var h = c.val(),
                        g = h !== d,
                        m = [h, a, b, f],
                        q = function (a, b, c) {
                            "function" === typeof f[a] && b && f[a].apply(this, c);
                        };
                    q("onChange", !0 === g, m);
                    q("onKeyPress", !0 === g, m);
                    q("onComplete", h.length === e.length, m);
                    q("onInvalid", 0 < c.invalid.length, [h, a, b, c.invalid, f]);
                },
            };
            b = a(b);
            var m = this,
                d = c.val(),
                h;
            e = "function" === typeof e ? e(c.val(), void 0, b, f) : e;
            m.mask = e;
            m.options = f;
            m.remove = function () {
                var a = c.getCaret();
                c.destroyEvents();
                c.val(m.getCleanVal());
                c.setCaret(a);
                return b;
            };
            m.getCleanVal = function () {
                return c.getMasked(!0);
            };
            m.getMaskedVal = function (a) {
                return c.getMasked(!1, a);
            };
            m.init = function (d) {
                d = d || !1;
                f = f || {};
                m.clearIfNotMatch = a.jMaskGlobals.clearIfNotMatch;
                m.byPassKeys = a.jMaskGlobals.byPassKeys;
                m.translation = a.extend({}, a.jMaskGlobals.translation, f.translation);
                m = a.extend(!0, {}, m, f);
                h = c.getRegexMask();
                if (d) c.events(), c.val(c.getMasked());
                else {
                    f.placeholder && b.attr("placeholder", f.placeholder);
                    b.data("mask") && b.attr("autocomplete", "off");
                    d = 0;
                    for (var l = !0; d < e.length; d++) {
                        var g = m.translation[e.charAt(d)];
                        if (g && g.recursive) {
                            l = !1;
                            break;
                        }
                    }
                    l && b.attr("maxlength", e.length);
                    c.destroyEvents();
                    c.events();
                    d = c.getCaret();
                    c.val(c.getMasked());
                    c.setCaret(d);
                }
            };
            m.init(!b.is("input"));
        };
        a.maskWatchers = {};
        var d = function () {
                var b = a(this),
                    e = {},
                    f = b.attr("data-mask");
                b.attr("data-mask-reverse") && (e.reverse = !0);
                b.attr("data-mask-clearifnotmatch") && (e.clearIfNotMatch = !0);
                "true" === b.attr("data-mask-selectonfocus") && (e.selectOnFocus = !0);
                if (p(b, f, e)) return b.data("mask", new l(this, f, e));
            },
            p = function (b, e, f) {
                f = f || {};
                var c = a(b).data("mask"),
                    d = JSON.stringify;
                b = a(b).val() || a(b).text();
                try {
                    return "function" === typeof e && (e = e(b)), "object" !== typeof c || d(c.options) !== d(f) || c.mask !== e;
                } catch (t) {}
            },
            h = function (a) {
                var b = document.createElement("div"),
                    d;
                a = "on" + a;
                d = a in b;
                d || (b.setAttribute(a, "return;"), (d = "function" === typeof b[a]));
                return d;
            };
        a.fn.mask = function (b, d) {
            d = d || {};
            var e = this.selector,
                c = a.jMaskGlobals,
                h = c.watchInterval,
                c = d.watchInputs || c.watchInputs,
                t = function () {
                    if (p(this, b, d)) return a(this).data("mask", new l(this, b, d));
                };
            a(this).each(t);
            e &&
                "" !== e &&
                c &&
                (clearInterval(a.maskWatchers[e]),
                (a.maskWatchers[e] = setInterval(function () {
                    a(document).find(e).each(t);
                }, h)));
            return this;
        };
        a.fn.masked = function (a) {
            return this.data("mask").getMaskedVal(a);
        };
        a.fn.unmask = function () {
            clearInterval(a.maskWatchers[this.selector]);
            delete a.maskWatchers[this.selector];
            return this.each(function () {
                var b = a(this).data("mask");
                b && b.remove().removeData("mask");
            });
        };
        a.fn.cleanVal = function () {
            return this.data("mask").getCleanVal();
        };
        a.applyDataMask = function (b) {
            b = b || a.jMaskGlobals.maskElements;
            (b instanceof a ? b : a(b)).filter(a.jMaskGlobals.dataMaskAttr).each(d);
        };
        h = {
            maskElements: "input,td,span,div",
            dataMaskAttr: "*[data-mask]",
            dataMask: !0,
            watchInterval: 300,
            watchInputs: !0,
            useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && h("input"),
            watchDataMask: !1,
            byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
            translation: { 0: { pattern: /\d/ }, 9: { pattern: /\d/, optional: !0 }, "#": { pattern: /\d/, recursive: !0 }, A: { pattern: /[a-zA-Z0-9]/ }, S: { pattern: /[a-zA-Z]/ } },
        };
        a.jMaskGlobals = a.jMaskGlobals || {};
        h = a.jMaskGlobals = a.extend(!0, {}, h, a.jMaskGlobals);
        h.dataMask && a.applyDataMask();
        setInterval(function () {
            a.jMaskGlobals.watchDataMask && a.applyDataMask();
        }, h.watchInterval);
    },
    window.jQuery,
    window.Zepto
);

/**
 * @preserve Copyright 2012 Twitter, Inc.
 * @license http://www.apache.org/licenses/LICENSE-2.0.txt
 */
var Hogan = {};
!(function (t) {
    function n(t, n, e) {
        var i;
        return n && "object" == typeof n && (void 0 !== n[t] ? (i = n[t]) : e && n.get && "function" == typeof n.get && (i = n.get(t))), i;
    }
    function e(t, n, e, i, r, s) {
        function a() {}
        function o() {}
        (a.prototype = t), (o.prototype = t.subs);
        var u,
            c = new a();
        (c.subs = new o()), (c.subsText = {}), (c.buf = ""), (i = i || {}), (c.stackSubs = i), (c.subsText = s);
        for (u in n) i[u] || (i[u] = n[u]);
        for (u in i) c.subs[u] = i[u];
        (r = r || {}), (c.stackPartials = r);
        for (u in e) r[u] || (r[u] = e[u]);
        for (u in r) c.partials[u] = r[u];
        return c;
    }
    function i(t) {
        return String(null === t || void 0 === t ? "" : t);
    }
    function r(t) {
        return (t = i(t)), l.test(t) ? t.replace(s, "&amp;").replace(a, "&lt;").replace(o, "&gt;").replace(u, "&#39;").replace(c, "&quot;") : t;
    }
    (t.Template = function (t, n, e, i) {
        (t = t || {}), (this.r = t.code || this.r), (this.c = e), (this.options = i || {}), (this.text = n || ""), (this.partials = t.partials || {}), (this.subs = t.subs || {}), (this.buf = "");
    }),
        (t.Template.prototype = {
            r: function () {
                return "";
            },
            v: r,
            t: i,
            render: function (t, n, e) {
                return this.ri([t], n || {}, e);
            },
            ri: function (t, n, e) {
                return this.r(t, n, e);
            },
            ep: function (t, n) {
                var i = this.partials[t],
                    r = n[i.name];
                if (i.instance && i.base == r) return i.instance;
                if ("string" == typeof r) {
                    if (!this.c) throw new Error("No compiler available.");
                    r = this.c.compile(r, this.options);
                }
                if (!r) return null;
                if (((this.partials[t].base = r), i.subs)) {
                    n.stackText || (n.stackText = {});
                    for (key in i.subs) n.stackText[key] || (n.stackText[key] = void 0 !== this.activeSub && n.stackText[this.activeSub] ? n.stackText[this.activeSub] : this.text);
                    r = e(r, i.subs, i.partials, this.stackSubs, this.stackPartials, n.stackText);
                }
                return (this.partials[t].instance = r), r;
            },
            rp: function (t, n, e, i) {
                var r = this.ep(t, e);
                return r ? r.ri(n, e, i) : "";
            },
            rs: function (t, n, e) {
                var i = t[t.length - 1];
                if (!f(i)) return void e(t, n, this);
                for (var r = 0; r < i.length; r++) t.push(i[r]), e(t, n, this), t.pop();
            },
            s: function (t, n, e, i, r, s, a) {
                var o;
                return f(t) && 0 === t.length ? !1 : ("function" == typeof t && (t = this.ms(t, n, e, i, r, s, a)), (o = !!t), !i && o && n && n.push("object" == typeof t ? t : n[n.length - 1]), o);
            },
            d: function (t, e, i, r) {
                var s,
                    a = t.split("."),
                    o = this.f(a[0], e, i, r),
                    u = this.options.modelGet,
                    c = null;
                if ("." === t && f(e[e.length - 2])) o = e[e.length - 1];
                else for (var l = 1; l < a.length; l++) (s = n(a[l], o, u)), void 0 !== s ? ((c = o), (o = s)) : (o = "");
                return r && !o ? !1 : (r || "function" != typeof o || (e.push(c), (o = this.mv(o, e, i)), e.pop()), o);
            },
            f: function (t, e, i, r) {
                for (var s = !1, a = null, o = !1, u = this.options.modelGet, c = e.length - 1; c >= 0; c--)
                    if (((a = e[c]), (s = n(t, a, u)), void 0 !== s)) {
                        o = !0;
                        break;
                    }
                return o ? (r || "function" != typeof s || (s = this.mv(s, e, i)), s) : r ? !1 : "";
            },
            ls: function (t, n, e, r, s) {
                var a = this.options.delimiters;
                return (this.options.delimiters = s), this.b(this.ct(i(t.call(n, r)), n, e)), (this.options.delimiters = a), !1;
            },
            ct: function (t, n, e) {
                if (this.options.disableLambda) throw new Error("Lambda features disabled.");
                return this.c.compile(t, this.options).render(n, e);
            },
            b: function (t) {
                this.buf += t;
            },
            fl: function () {
                var t = this.buf;
                return (this.buf = ""), t;
            },
            ms: function (t, n, e, i, r, s, a) {
                var o,
                    u = n[n.length - 1],
                    c = t.call(u);
                return "function" == typeof c ? (i ? !0 : ((o = this.activeSub && this.subsText && this.subsText[this.activeSub] ? this.subsText[this.activeSub] : this.text), this.ls(c, u, e, o.substring(r, s), a))) : c;
            },
            mv: function (t, n, e) {
                var r = n[n.length - 1],
                    s = t.call(r);
                return "function" == typeof s ? this.ct(i(s.call(r)), r, e) : s;
            },
            sub: function (t, n, e, i) {
                var r = this.subs[t];
                r && ((this.activeSub = t), r(n, e, this, i), (this.activeSub = !1));
            },
        });
    var s = /&/g,
        a = /</g,
        o = />/g,
        u = /\'/g,
        c = /\"/g,
        l = /[&<>\"\']/,
        f =
            Array.isArray ||
            function (t) {
                return "[object Array]" === Object.prototype.toString.call(t);
            };
})("undefined" != typeof exports ? exports : Hogan),
    (function (t) {
        function n(t) {
            "}" === t.n.substr(t.n.length - 1) && (t.n = t.n.substring(0, t.n.length - 1));
        }
        function e(t) {
            return t.trim ? t.trim() : t.replace(/^\s*|\s*$/g, "");
        }
        function i(t, n, e) {
            if (n.charAt(e) != t.charAt(0)) return !1;
            for (var i = 1, r = t.length; r > i; i++) if (n.charAt(e + i) != t.charAt(i)) return !1;
            return !0;
        }
        function r(n, e, i, o) {
            var u = [],
                c = null,
                l = null,
                f = null;
            for (l = i[i.length - 1]; n.length > 0; ) {
                if (((f = n.shift()), l && "<" == l.tag && !(f.tag in k))) throw new Error("Illegal content in < super tag.");
                if (t.tags[f.tag] <= t.tags.$ || s(f, o)) i.push(f), (f.nodes = r(n, f.tag, i, o));
                else {
                    if ("/" == f.tag) {
                        if (0 === i.length) throw new Error("Closing tag without opener: /" + f.n);
                        if (((c = i.pop()), f.n != c.n && !a(f.n, c.n, o))) throw new Error("Nesting error: " + c.n + " vs. " + f.n);
                        return (c.end = f.i), u;
                    }
                    "\n" == f.tag && (f.last = 0 == n.length || "\n" == n[0].tag);
                }
                u.push(f);
            }
            if (i.length > 0) throw new Error("missing closing tag: " + i.pop().n);
            return u;
        }
        function s(t, n) {
            for (var e = 0, i = n.length; i > e; e++) if (n[e].o == t.n) return (t.tag = "#"), !0;
        }
        function a(t, n, e) {
            for (var i = 0, r = e.length; r > i; i++) if (e[i].c == t && e[i].o == n) return !0;
        }
        function o(t) {
            var n = [];
            for (var e in t) n.push('"' + c(e) + '": function(c,p,t,i) {' + t[e] + "}");
            return "{ " + n.join(",") + " }";
        }
        function u(t) {
            var n = [];
            for (var e in t.partials) n.push('"' + c(e) + '":{name:"' + c(t.partials[e].name) + '", ' + u(t.partials[e]) + "}");
            return "partials: {" + n.join(",") + "}, subs: " + o(t.subs);
        }
        function c(t) {
            return t.replace(m, "\\\\").replace(v, '\\"').replace(b, "\\n").replace(d, "\\r").replace(x, "\\u2028").replace(w, "\\u2029");
        }
        function l(t) {
            return ~t.indexOf(".") ? "d" : "f";
        }
        function f(t, n) {
            var e = "<" + (n.prefix || ""),
                i = e + t.n + y++;
            return (n.partials[i] = { name: t.n, partials: {} }), (n.code += 't.b(t.rp("' + c(i) + '",c,p,"' + (t.indent || "") + '"));'), i;
        }
        function h(t, n) {
            n.code += "t.b(t.t(t." + l(t.n) + '("' + c(t.n) + '",c,p,0)));';
        }
        function p(t) {
            return "t.b(" + t + ");";
        }
        var g = /\S/,
            v = /\"/g,
            b = /\n/g,
            d = /\r/g,
            m = /\\/g,
            x = /\u2028/,
            w = /\u2029/;
        (t.tags = { "#": 1, "^": 2, "<": 3, $: 4, "/": 5, "!": 6, ">": 7, "=": 8, _v: 9, "{": 10, "&": 11, _t: 12 }),
            (t.scan = function (r, s) {
                function a() {
                    m.length > 0 && (x.push({ tag: "_t", text: new String(m) }), (m = ""));
                }
                function o() {
                    for (var n = !0, e = y; e < x.length; e++) if (((n = t.tags[x[e].tag] < t.tags._v || ("_t" == x[e].tag && null === x[e].text.match(g))), !n)) return !1;
                    return n;
                }
                function u(t, n) {
                    if ((a(), t && o())) for (var e, i = y; i < x.length; i++) x[i].text && ((e = x[i + 1]) && ">" == e.tag && (e.indent = x[i].text.toString()), x.splice(i, 1));
                    else n || x.push({ tag: "\n" });
                    (w = !1), (y = x.length);
                }
                function c(t, n) {
                    var i = "=" + S,
                        r = t.indexOf(i, n),
                        s = e(t.substring(t.indexOf("=", n) + 1, r)).split(" ");
                    return (T = s[0]), (S = s[s.length - 1]), r + i.length - 1;
                }
                var l = r.length,
                    f = 0,
                    h = 1,
                    p = 2,
                    v = f,
                    b = null,
                    d = null,
                    m = "",
                    x = [],
                    w = !1,
                    k = 0,
                    y = 0,
                    T = "{{",
                    S = "}}";
                for (s && ((s = s.split(" ")), (T = s[0]), (S = s[1])), k = 0; l > k; k++)
                    v == f
                        ? i(T, r, k)
                            ? (--k, a(), (v = h))
                            : "\n" == r.charAt(k)
                            ? u(w)
                            : (m += r.charAt(k))
                        : v == h
                        ? ((k += T.length - 1), (d = t.tags[r.charAt(k + 1)]), (b = d ? r.charAt(k + 1) : "_v"), "=" == b ? ((k = c(r, k)), (v = f)) : (d && k++, (v = p)), (w = k))
                        : i(S, r, k)
                        ? (x.push({ tag: b, n: e(m), otag: T, ctag: S, i: "/" == b ? w - T.length : k + S.length }), (m = ""), (k += S.length - 1), (v = f), "{" == b && ("}}" == S ? k++ : n(x[x.length - 1])))
                        : (m += r.charAt(k));
                return u(w, !0), x;
            });
        var k = { _t: !0, "\n": !0, $: !0, "/": !0 };
        t.stringify = function (n) {
            return "{code: function (c,p,i) { " + t.wrapMain(n.code) + " }," + u(n) + "}";
        };
        var y = 0;
        (t.generate = function (n, e, i) {
            y = 0;
            var r = { code: "", subs: {}, partials: {} };
            return t.walk(n, r), i.asString ? this.stringify(r, e, i) : this.makeTemplate(r, e, i);
        }),
            (t.wrapMain = function (t) {
                return 'var t=this;t.b(i=i||"");' + t + "return t.fl();";
            }),
            (t.template = t.Template),
            (t.makeTemplate = function (t, n, e) {
                var i = this.makePartials(t);
                return (i.code = new Function("c", "p", "i", this.wrapMain(t.code))), new this.template(i, n, this, e);
            }),
            (t.makePartials = function (t) {
                var n,
                    e = { subs: {}, partials: t.partials, name: t.name };
                for (n in e.partials) e.partials[n] = this.makePartials(e.partials[n]);
                for (n in t.subs) e.subs[n] = new Function("c", "p", "t", "i", t.subs[n]);
                return e;
            }),
            (t.codegen = {
                "#": function (n, e) {
                    (e.code += "if(t.s(t." + l(n.n) + '("' + c(n.n) + '",c,p,1),c,p,0,' + n.i + "," + n.end + ',"' + n.otag + " " + n.ctag + '")){t.rs(c,p,function(c,p,t){'), t.walk(n.nodes, e), (e.code += "});c.pop();}");
                },
                "^": function (n, e) {
                    (e.code += "if(!t.s(t." + l(n.n) + '("' + c(n.n) + '",c,p,1),c,p,1,0,0,"")){'), t.walk(n.nodes, e), (e.code += "};");
                },
                ">": f,
                "<": function (n, e) {
                    var i = { partials: {}, code: "", subs: {}, inPartial: !0 };
                    t.walk(n.nodes, i);
                    var r = e.partials[f(n, e)];
                    (r.subs = i.subs), (r.partials = i.partials);
                },
                $: function (n, e) {
                    var i = { subs: {}, code: "", partials: e.partials, prefix: n.n };
                    t.walk(n.nodes, i), (e.subs[n.n] = i.code), e.inPartial || (e.code += 't.sub("' + c(n.n) + '",c,p,i);');
                },
                "\n": function (t, n) {
                    n.code += p('"\\n"' + (t.last ? "" : " + i"));
                },
                _v: function (t, n) {
                    n.code += "t.b(t.v(t." + l(t.n) + '("' + c(t.n) + '",c,p,0)));';
                },
                _t: function (t, n) {
                    n.code += p('"' + c(t.text) + '"');
                },
                "{": h,
                "&": h,
            }),
            (t.walk = function (n, e) {
                for (var i, r = 0, s = n.length; s > r; r++) (i = t.codegen[n[r].tag]), i && i(n[r], e);
                return e;
            }),
            (t.parse = function (t, n, e) {
                return (e = e || {}), r(t, "", [], e.sectionTags || []);
            }),
            (t.cache = {}),
            (t.cacheKey = function (t, n) {
                return [t, !!n.asString, !!n.disableLambda, n.delimiters, !!n.modelGet].join("||");
            }),
            (t.compile = function (n, e) {
                e = e || {};
                var i = t.cacheKey(n, e),
                    r = this.cache[i];
                if (r) {
                    var s = r.partials;
                    for (var a in s) delete s[a].instance;
                    return r;
                }
                return (r = this.generate(this.parse(this.scan(n, e.delimiters), n, e), n, e)), (this.cache[i] = r);
            });
    })("undefined" != typeof exports ? exports : Hogan);

/*
 Version: 1.9.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues
 */
(function (i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? (module.exports = i(require("jquery"))) : i(jQuery);
})(function (i) {
    "use strict";
    var e = window.Slick || {};
    (e = (function () {
        function e(e, o) {
            var s,
                n = this;
            (n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(e),
                appendDots: i(e),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (e, t) {
                    return i('<button type="button" />').text(t + 1);
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: 0.35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3,
            }),
                (n.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    scrolling: !1,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    swiping: !1,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1,
                }),
                i.extend(n, n.initials),
                (n.activeBreakpoint = null),
                (n.animType = null),
                (n.animProp = null),
                (n.breakpoints = []),
                (n.breakpointSettings = []),
                (n.cssTransitions = !1),
                (n.focussed = !1),
                (n.interrupted = !1),
                (n.hidden = "hidden"),
                (n.paused = !0),
                (n.positionProp = null),
                (n.respondTo = null),
                (n.rowCount = 1),
                (n.shouldClick = !0),
                (n.$slider = i(e)),
                (n.$slidesCache = null),
                (n.transformType = null),
                (n.transitionType = null),
                (n.visibilityChange = "visibilitychange"),
                (n.windowWidth = 0),
                (n.windowTimer = null),
                (s = i(e).data("slick") || {}),
                (n.options = i.extend({}, n.defaults, o, s)),
                (n.currentSlide = n.options.initialSlide),
                (n.originalSettings = n.options),
                "undefined" != typeof document.mozHidden
                    ? ((n.hidden = "mozHidden"), (n.visibilityChange = "mozvisibilitychange"))
                    : "undefined" != typeof document.webkitHidden && ((n.hidden = "webkitHidden"), (n.visibilityChange = "webkitvisibilitychange")),
                (n.autoPlay = i.proxy(n.autoPlay, n)),
                (n.autoPlayClear = i.proxy(n.autoPlayClear, n)),
                (n.autoPlayIterator = i.proxy(n.autoPlayIterator, n)),
                (n.changeSlide = i.proxy(n.changeSlide, n)),
                (n.clickHandler = i.proxy(n.clickHandler, n)),
                (n.selectHandler = i.proxy(n.selectHandler, n)),
                (n.setPosition = i.proxy(n.setPosition, n)),
                (n.swipeHandler = i.proxy(n.swipeHandler, n)),
                (n.dragHandler = i.proxy(n.dragHandler, n)),
                (n.keyHandler = i.proxy(n.keyHandler, n)),
                (n.instanceUid = t++),
                (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
                n.registerBreakpoints(),
                n.init(!0);
        }
        var t = 0;
        return e;
    })()),
        (e.prototype.activateADA = function () {
            var i = this;
            i.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" });
        }),
        (e.prototype.addSlide = e.prototype.slickAdd = function (e, t, o) {
            var s = this;
            if ("boolean" == typeof t) (o = t), (t = null);
            else if (t < 0 || t >= s.slideCount) return !1;
            s.unload(),
                "number" == typeof t
                    ? 0 === t && 0 === s.$slides.length
                        ? i(e).appendTo(s.$slideTrack)
                        : o
                        ? i(e).insertBefore(s.$slides.eq(t))
                        : i(e).insertAfter(s.$slides.eq(t))
                    : o === !0
                    ? i(e).prependTo(s.$slideTrack)
                    : i(e).appendTo(s.$slideTrack),
                (s.$slides = s.$slideTrack.children(this.options.slide)),
                s.$slideTrack.children(this.options.slide).detach(),
                s.$slideTrack.append(s.$slides),
                s.$slides.each(function (e, t) {
                    i(t).attr("data-slick-index", e);
                }),
                (s.$slidesCache = s.$slides),
                s.reinit();
        }),
        (e.prototype.animateHeight = function () {
            var i = this;
            if (1 === i.options.slidesToShow && i.options.adaptiveHeight === !0 && i.options.vertical === !1) {
                var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                i.$list.animate({ height: e }, i.options.speed);
            }
        }),
        (e.prototype.animateSlide = function (e, t) {
            var o = {},
                s = this;
            s.animateHeight(),
                s.options.rtl === !0 && s.options.vertical === !1 && (e = -e),
                s.transformsEnabled === !1
                    ? s.options.vertical === !1
                        ? s.$slideTrack.animate({ left: e }, s.options.speed, s.options.easing, t)
                        : s.$slideTrack.animate({ top: e }, s.options.speed, s.options.easing, t)
                    : s.cssTransitions === !1
                    ? (s.options.rtl === !0 && (s.currentLeft = -s.currentLeft),
                      i({ animStart: s.currentLeft }).animate(
                          { animStart: e },
                          {
                              duration: s.options.speed,
                              easing: s.options.easing,
                              step: function (i) {
                                  (i = Math.ceil(i)), s.options.vertical === !1 ? ((o[s.animType] = "translate(" + i + "px, 0px)"), s.$slideTrack.css(o)) : ((o[s.animType] = "translate(0px," + i + "px)"), s.$slideTrack.css(o));
                              },
                              complete: function () {
                                  t && t.call();
                              },
                          }
                      ))
                    : (s.applyTransition(),
                      (e = Math.ceil(e)),
                      s.options.vertical === !1 ? (o[s.animType] = "translate3d(" + e + "px, 0px, 0px)") : (o[s.animType] = "translate3d(0px," + e + "px, 0px)"),
                      s.$slideTrack.css(o),
                      t &&
                          setTimeout(function () {
                              s.disableTransition(), t.call();
                          }, s.options.speed));
        }),
        (e.prototype.getNavTarget = function () {
            var e = this,
                t = e.options.asNavFor;
            return t && null !== t && (t = i(t).not(e.$slider)), t;
        }),
        (e.prototype.asNavFor = function (e) {
            var t = this,
                o = t.getNavTarget();
            null !== o &&
                "object" == typeof o &&
                o.each(function () {
                    var t = i(this).slick("getSlick");
                    t.unslicked || t.slideHandler(e, !0);
                });
        }),
        (e.prototype.applyTransition = function (i) {
            var e = this,
                t = {};
            e.options.fade === !1 ? (t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase) : (t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase),
                e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
        }),
        (e.prototype.autoPlay = function () {
            var i = this;
            i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed));
        }),
        (e.prototype.autoPlayClear = function () {
            var i = this;
            i.autoPlayTimer && clearInterval(i.autoPlayTimer);
        }),
        (e.prototype.autoPlayIterator = function () {
            var i = this,
                e = i.currentSlide + i.options.slidesToScroll;
            i.paused ||
                i.interrupted ||
                i.focussed ||
                (i.options.infinite === !1 &&
                    (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? (i.direction = 0) : 0 === i.direction && ((e = i.currentSlide - i.options.slidesToScroll), i.currentSlide - 1 === 0 && (i.direction = 1))),
                i.slideHandler(e));
        }),
        (e.prototype.buildArrows = function () {
            var e = this;
            e.options.arrows === !0 &&
                ((e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow")),
                (e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow")),
                e.slideCount > e.options.slidesToShow
                    ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                      e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                      e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows),
                      e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows),
                      e.options.infinite !== !0 && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"))
                    : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" }));
        }),
        (e.prototype.buildDots = function () {
            var e,
                t,
                o = this;
            if (o.options.dots === !0 && o.slideCount > o.options.slidesToShow) {
                for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
                (o.$dots = t.appendTo(o.options.appendDots)), o.$dots.find("li").first().addClass("slick-active");
            }
        }),
        (e.prototype.buildOut = function () {
            var e = this;
            (e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide")),
                (e.slideCount = e.$slides.length),
                e.$slides.each(function (e, t) {
                    i(t)
                        .attr("data-slick-index", e)
                        .data("originalStyling", i(t).attr("style") || "");
                }),
                e.$slider.addClass("slick-slider"),
                (e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
                (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
                e.$slideTrack.css("opacity", 0),
                (e.options.centerMode !== !0 && e.options.swipeToSlide !== !0) || (e.options.slidesToScroll = 1),
                i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
                e.setupInfinite(),
                e.buildArrows(),
                e.buildDots(),
                e.updateDots(),
                e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
                e.options.draggable === !0 && e.$list.addClass("draggable");
        }),
        (e.prototype.buildRows = function () {
            var i,
                e,
                t,
                o,
                s,
                n,
                r,
                l = this;
            if (((o = document.createDocumentFragment()), (n = l.$slider.children()), l.options.rows > 0)) {
                for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
                    var d = document.createElement("div");
                    for (e = 0; e < l.options.rows; e++) {
                        var a = document.createElement("div");
                        for (t = 0; t < l.options.slidesPerRow; t++) {
                            var c = i * r + (e * l.options.slidesPerRow + t);
                            n.get(c) && a.appendChild(n.get(c));
                        }
                        d.appendChild(a);
                    }
                    o.appendChild(d);
                }
                l.$slider.empty().append(o),
                    l.$slider
                        .children()
                        .children()
                        .children()
                        .css({ width: 100 / l.options.slidesPerRow + "%", display: "inline-block" });
            }
        }),
        (e.prototype.checkResponsive = function (e, t) {
            var o,
                s,
                n,
                r = this,
                l = !1,
                d = r.$slider.width(),
                a = window.innerWidth || i(window).width();
            if (("window" === r.respondTo ? (n = a) : "slider" === r.respondTo ? (n = d) : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive)) {
                s = null;
                for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (r.originalSettings.mobileFirst === !1 ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
                null !== s
                    ? null !== r.activeBreakpoint
                        ? (s !== r.activeBreakpoint || t) &&
                          ((r.activeBreakpoint = s),
                          "unslick" === r.breakpointSettings[s] ? r.unslick(s) : ((r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s])), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)),
                          (l = s))
                        : ((r.activeBreakpoint = s),
                          "unslick" === r.breakpointSettings[s] ? r.unslick(s) : ((r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s])), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)),
                          (l = s))
                    : null !== r.activeBreakpoint && ((r.activeBreakpoint = null), (r.options = r.originalSettings), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e), (l = s)),
                    e || l === !1 || r.$slider.trigger("breakpoint", [r, l]);
            }
        }),
        (e.prototype.changeSlide = function (e, t) {
            var o,
                s,
                n,
                r = this,
                l = i(e.currentTarget);
            switch ((l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), (n = r.slideCount % r.options.slidesToScroll !== 0), (o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll), e.data.message)) {
                case "previous":
                    (s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o), r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                    break;
                case "next":
                    (s = 0 === o ? r.options.slidesToScroll : o), r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                    break;
                case "index":
                    var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                    r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
                    break;
                default:
                    return;
            }
        }),
        (e.prototype.checkNavigable = function (i) {
            var e,
                t,
                o = this;
            if (((e = o.getNavigableIndexes()), (t = 0), i > e[e.length - 1])) i = e[e.length - 1];
            else
                for (var s in e) {
                    if (i < e[s]) {
                        i = t;
                        break;
                    }
                    t = e[s];
                }
            return i;
        }),
        (e.prototype.cleanUpEvents = function () {
            var e = this;
            e.options.dots &&
                null !== e.$dots &&
                (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
                e.options.accessibility === !0 && e.$dots.off("keydown.slick", e.keyHandler)),
                e.$slider.off("focus.slick blur.slick"),
                e.options.arrows === !0 &&
                    e.slideCount > e.options.slidesToShow &&
                    (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
                    e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
                    e.options.accessibility === !0 && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
                e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
                e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
                e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
                e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
                e.$list.off("click.slick", e.clickHandler),
                i(document).off(e.visibilityChange, e.visibility),
                e.cleanUpSlideEvents(),
                e.options.accessibility === !0 && e.$list.off("keydown.slick", e.keyHandler),
                e.options.focusOnSelect === !0 && i(e.$slideTrack).children().off("click.slick", e.selectHandler),
                i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange),
                i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
                i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault),
                i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
        }),
        (e.prototype.cleanUpSlideEvents = function () {
            var e = this;
            e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
        }),
        (e.prototype.cleanUpRows = function () {
            var i,
                e = this;
            e.options.rows > 0 && ((i = e.$slides.children().children()), i.removeAttr("style"), e.$slider.empty().append(i));
        }),
        (e.prototype.clickHandler = function (i) {
            var e = this;
            e.shouldClick === !1 && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
        }),
        (e.prototype.destroy = function (e) {
            var t = this;
            t.autoPlayClear(),
                (t.touchObject = {}),
                t.cleanUpEvents(),
                i(".slick-cloned", t.$slider).detach(),
                t.$dots && t.$dots.remove(),
                t.$prevArrow &&
                    t.$prevArrow.length &&
                    (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
                t.$nextArrow &&
                    t.$nextArrow.length &&
                    (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
                t.$slides &&
                    (t.$slides
                        .removeClass("slick-slide slick-active slick-center slick-visible slick-current")
                        .removeAttr("aria-hidden")
                        .removeAttr("data-slick-index")
                        .each(function () {
                            i(this).attr("style", i(this).data("originalStyling"));
                        }),
                    t.$slideTrack.children(this.options.slide).detach(),
                    t.$slideTrack.detach(),
                    t.$list.detach(),
                    t.$slider.append(t.$slides)),
                t.cleanUpRows(),
                t.$slider.removeClass("slick-slider"),
                t.$slider.removeClass("slick-initialized"),
                t.$slider.removeClass("slick-dotted"),
                (t.unslicked = !0),
                e || t.$slider.trigger("destroy", [t]);
        }),
        (e.prototype.disableTransition = function (i) {
            var e = this,
                t = {};
            (t[e.transitionType] = ""), e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
        }),
        (e.prototype.fadeSlide = function (i, e) {
            var t = this;
            t.cssTransitions === !1
                ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }), t.$slides.eq(i).animate({ opacity: 1 }, t.options.speed, t.options.easing, e))
                : (t.applyTransition(i),
                  t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }),
                  e &&
                      setTimeout(function () {
                          t.disableTransition(i), e.call();
                      }, t.options.speed));
        }),
        (e.prototype.fadeSlideOut = function (i) {
            var e = this;
            e.cssTransitions === !1 ? e.$slides.eq(i).animate({ opacity: 0, zIndex: e.options.zIndex - 2 }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
        }),
        (e.prototype.filterSlides = e.prototype.slickFilter = function (i) {
            var e = this;
            null !== i && ((e.$slidesCache = e.$slides), e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit());
        }),
        (e.prototype.focusHandler = function () {
            var e = this;
            e.$slider
                .off("focus.slick blur.slick")
                .on("focus.slick", "*", function (t) {
                    var o = i(this);
                    setTimeout(function () {
                        e.options.pauseOnFocus && o.is(":focus") && ((e.focussed = !0), e.autoPlay());
                    }, 0);
                })
                .on("blur.slick", "*", function (t) {
                    i(this);
                    e.options.pauseOnFocus && ((e.focussed = !1), e.autoPlay());
                });
        }),
        (e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
            var i = this;
            return i.currentSlide;
        }),
        (e.prototype.getDotCount = function () {
            var i = this,
                e = 0,
                t = 0,
                o = 0;
            if (i.options.infinite === !0)
                if (i.slideCount <= i.options.slidesToShow) ++o;
                else for (; e < i.slideCount; ) ++o, (e = t + i.options.slidesToScroll), (t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow);
            else if (i.options.centerMode === !0) o = i.slideCount;
            else if (i.options.asNavFor) for (; e < i.slideCount; ) ++o, (e = t + i.options.slidesToScroll), (t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow);
            else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
            return o - 1;
        }),
        (e.prototype.getLeft = function (i) {
            var e,
                t,
                o,
                s,
                n = this,
                r = 0;
            return (
                (n.slideOffset = 0),
                (t = n.$slides.first().outerHeight(!0)),
                n.options.infinite === !0
                    ? (n.slideCount > n.options.slidesToShow &&
                          ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
                          (s = -1),
                          n.options.vertical === !0 && n.options.centerMode === !0 && (2 === n.options.slidesToShow ? (s = -1.5) : 1 === n.options.slidesToShow && (s = -2)),
                          (r = t * n.options.slidesToShow * s)),
                      n.slideCount % n.options.slidesToScroll !== 0 &&
                          i + n.options.slidesToScroll > n.slideCount &&
                          n.slideCount > n.options.slidesToShow &&
                          (i > n.slideCount
                              ? ((n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1), (r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1))
                              : ((n.slideOffset = (n.slideCount % n.options.slidesToScroll) * n.slideWidth * -1), (r = (n.slideCount % n.options.slidesToScroll) * t * -1))))
                    : i + n.options.slidesToShow > n.slideCount && ((n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth), (r = (i + n.options.slidesToShow - n.slideCount) * t)),
                n.slideCount <= n.options.slidesToShow && ((n.slideOffset = 0), (r = 0)),
                n.options.centerMode === !0 && n.slideCount <= n.options.slidesToShow
                    ? (n.slideOffset = (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 - (n.slideWidth * n.slideCount) / 2)
                    : n.options.centerMode === !0 && n.options.infinite === !0
                    ? (n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth)
                    : n.options.centerMode === !0 && ((n.slideOffset = 0), (n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
                (e = n.options.vertical === !1 ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r),
                n.options.variableWidth === !0 &&
                    ((o = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow)),
                    (e = n.options.rtl === !0 ? (o[0] ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1 : 0) : o[0] ? o[0].offsetLeft * -1 : 0),
                    n.options.centerMode === !0 &&
                        ((o = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1)),
                        (e = n.options.rtl === !0 ? (o[0] ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1 : 0) : o[0] ? o[0].offsetLeft * -1 : 0),
                        (e += (n.$list.width() - o.outerWidth()) / 2))),
                e
            );
        }),
        (e.prototype.getOption = e.prototype.slickGetOption = function (i) {
            var e = this;
            return e.options[i];
        }),
        (e.prototype.getNavigableIndexes = function () {
            var i,
                e = this,
                t = 0,
                o = 0,
                s = [];
            for (e.options.infinite === !1 ? (i = e.slideCount) : ((t = e.options.slidesToScroll * -1), (o = e.options.slidesToScroll * -1), (i = 2 * e.slideCount)); t < i; )
                s.push(t), (t = o + e.options.slidesToScroll), (o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow);
            return s;
        }),
        (e.prototype.getSlick = function () {
            return this;
        }),
        (e.prototype.getSlideCount = function () {
            var e,
                t,
                o,
                s,
                n = this;
            return (
                (s = n.options.centerMode === !0 ? Math.floor(n.$list.width() / 2) : 0),
                (o = n.swipeLeft * -1 + s),
                n.options.swipeToSlide === !0
                    ? (n.$slideTrack.find(".slick-slide").each(function (e, s) {
                          var r, l, d;
                          if (((r = i(s).outerWidth()), (l = s.offsetLeft), n.options.centerMode !== !0 && (l += r / 2), (d = l + r), o < d)) return (t = s), !1;
                      }),
                      (e = Math.abs(i(t).attr("data-slick-index") - n.currentSlide) || 1))
                    : n.options.slidesToScroll
            );
        }),
        (e.prototype.goTo = e.prototype.slickGoTo = function (i, e) {
            var t = this;
            t.changeSlide({ data: { message: "index", index: parseInt(i) } }, e);
        }),
        (e.prototype.init = function (e) {
            var t = this;
            i(t.$slider).hasClass("slick-initialized") ||
                (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()),
                e && t.$slider.trigger("init", [t]),
                t.options.accessibility === !0 && t.initADA(),
                t.options.autoplay && ((t.paused = !1), t.autoPlay());
        }),
        (e.prototype.initADA = function () {
            var e = this,
                t = Math.ceil(e.slideCount / e.options.slidesToShow),
                o = e.getNavigableIndexes().filter(function (i) {
                    return i >= 0 && i < e.slideCount;
                });
            e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }),
                null !== e.$dots &&
                    (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (t) {
                        var s = o.indexOf(t);
                        if ((i(this).attr({ role: "tabpanel", id: "slick-slide" + e.instanceUid + t, tabindex: -1 }), s !== -1)) {
                            var n = "slick-slide-control" + e.instanceUid + s;
                            i("#" + n).length && i(this).attr({ "aria-describedby": n });
                        }
                    }),
                    e.$dots
                        .attr("role", "tablist")
                        .find("li")
                        .each(function (s) {
                            var n = o[s];
                            i(this).attr({ role: "presentation" }),
                                i(this)
                                    .find("button")
                                    .first()
                                    .attr({ role: "tab", id: "slick-slide-control" + e.instanceUid + s, "aria-controls": "slick-slide" + e.instanceUid + n, "aria-label": s + 1 + " of " + t, "aria-selected": null, tabindex: "-1" });
                        })
                        .eq(e.currentSlide)
                        .find("button")
                        .attr({ "aria-selected": "true", tabindex: "0" })
                        .end());
            for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.options.focusOnChange ? e.$slides.eq(s).attr({ tabindex: "0" }) : e.$slides.eq(s).removeAttr("tabindex");
            e.activateADA();
        }),
        (e.prototype.initArrowEvents = function () {
            var i = this;
            i.options.arrows === !0 &&
                i.slideCount > i.options.slidesToShow &&
                (i.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, i.changeSlide),
                i.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, i.changeSlide),
                i.options.accessibility === !0 && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)));
        }),
        (e.prototype.initDotEvents = function () {
            var e = this;
            e.options.dots === !0 && e.slideCount > e.options.slidesToShow && (i("li", e.$dots).on("click.slick", { message: "index" }, e.changeSlide), e.options.accessibility === !0 && e.$dots.on("keydown.slick", e.keyHandler)),
                e.options.dots === !0 && e.options.pauseOnDotsHover === !0 && e.slideCount > e.options.slidesToShow && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
        }),
        (e.prototype.initSlideEvents = function () {
            var e = this;
            e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
        }),
        (e.prototype.initializeEvents = function () {
            var e = this;
            e.initArrowEvents(),
                e.initDotEvents(),
                e.initSlideEvents(),
                e.$list.on("touchstart.slick mousedown.slick", { action: "start" }, e.swipeHandler),
                e.$list.on("touchmove.slick mousemove.slick", { action: "move" }, e.swipeHandler),
                e.$list.on("touchend.slick mouseup.slick", { action: "end" }, e.swipeHandler),
                e.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, e.swipeHandler),
                e.$list.on("click.slick", e.clickHandler),
                i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
                e.options.accessibility === !0 && e.$list.on("keydown.slick", e.keyHandler),
                e.options.focusOnSelect === !0 && i(e.$slideTrack).children().on("click.slick", e.selectHandler),
                i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)),
                i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)),
                i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
                i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
                i(e.setPosition);
        }),
        (e.prototype.initUI = function () {
            var i = this;
            i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), i.options.dots === !0 && i.slideCount > i.options.slidesToShow && i.$dots.show();
        }),
        (e.prototype.keyHandler = function (i) {
            var e = this;
            i.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
                (37 === i.keyCode && e.options.accessibility === !0
                    ? e.changeSlide({ data: { message: e.options.rtl === !0 ? "next" : "previous" } })
                    : 39 === i.keyCode && e.options.accessibility === !0 && e.changeSlide({ data: { message: e.options.rtl === !0 ? "previous" : "next" } }));
        }),
        (e.prototype.lazyLoad = function () {
            function e(e) {
                i("img[data-lazy]", e).each(function () {
                    var e = i(this),
                        t = i(this).attr("data-lazy"),
                        o = i(this).attr("data-srcset"),
                        s = i(this).attr("data-sizes") || r.$slider.attr("data-sizes"),
                        n = document.createElement("img");
                    (n.onload = function () {
                        e.animate({ opacity: 0 }, 100, function () {
                            o && (e.attr("srcset", o), s && e.attr("sizes", s)),
                                e.attr("src", t).animate({ opacity: 1 }, 200, function () {
                                    e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
                                }),
                                r.$slider.trigger("lazyLoaded", [r, e, t]);
                        });
                    }),
                        (n.onerror = function () {
                            e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, e, t]);
                        }),
                        (n.src = t);
                });
            }
            var t,
                o,
                s,
                n,
                r = this;
            if (
                (r.options.centerMode === !0
                    ? r.options.infinite === !0
                        ? ((s = r.currentSlide + (r.options.slidesToShow / 2 + 1)), (n = s + r.options.slidesToShow + 2))
                        : ((s = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1))), (n = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide))
                    : ((s = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide), (n = Math.ceil(s + r.options.slidesToShow)), r.options.fade === !0 && (s > 0 && s--, n <= r.slideCount && n++)),
                (t = r.$slider.find(".slick-slide").slice(s, n)),
                "anticipated" === r.options.lazyLoad)
            )
                for (var l = s - 1, d = n, a = r.$slider.find(".slick-slide"), c = 0; c < r.options.slidesToScroll; c++) l < 0 && (l = r.slideCount - 1), (t = t.add(a.eq(l))), (t = t.add(a.eq(d))), l--, d++;
            e(t),
                r.slideCount <= r.options.slidesToShow
                    ? ((o = r.$slider.find(".slick-slide")), e(o))
                    : r.currentSlide >= r.slideCount - r.options.slidesToShow
                    ? ((o = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow)), e(o))
                    : 0 === r.currentSlide && ((o = r.$slider.find(".slick-cloned").slice(r.options.slidesToShow * -1)), e(o));
        }),
        (e.prototype.loadSlider = function () {
            var i = this;
            i.setPosition(), i.$slideTrack.css({ opacity: 1 }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
        }),
        (e.prototype.next = e.prototype.slickNext = function () {
            var i = this;
            i.changeSlide({ data: { message: "next" } });
        }),
        (e.prototype.orientationChange = function () {
            var i = this;
            i.checkResponsive(), i.setPosition();
        }),
        (e.prototype.pause = e.prototype.slickPause = function () {
            var i = this;
            i.autoPlayClear(), (i.paused = !0);
        }),
        (e.prototype.play = e.prototype.slickPlay = function () {
            var i = this;
            i.autoPlay(), (i.options.autoplay = !0), (i.paused = !1), (i.focussed = !1), (i.interrupted = !1);
        }),
        (e.prototype.postSlide = function (e) {
            var t = this;
            if (
                !t.unslicked &&
                (t.$slider.trigger("afterChange", [t, e]),
                (t.animating = !1),
                t.slideCount > t.options.slidesToShow && t.setPosition(),
                (t.swipeLeft = null),
                t.options.autoplay && t.autoPlay(),
                t.options.accessibility === !0 && (t.initADA(), t.options.focusOnChange))
            ) {
                var o = i(t.$slides.get(t.currentSlide));
                o.attr("tabindex", 0).focus();
            }
        }),
        (e.prototype.prev = e.prototype.slickPrev = function () {
            var i = this;
            i.changeSlide({ data: { message: "previous" } });
        }),
        (e.prototype.preventDefault = function (i) {
            i.preventDefault();
        }),
        (e.prototype.progressiveLazyLoad = function (e) {
            e = e || 1;
            var t,
                o,
                s,
                n,
                r,
                l = this,
                d = i("img[data-lazy]", l.$slider);
            d.length
                ? ((t = d.first()),
                  (o = t.attr("data-lazy")),
                  (s = t.attr("data-srcset")),
                  (n = t.attr("data-sizes") || l.$slider.attr("data-sizes")),
                  (r = document.createElement("img")),
                  (r.onload = function () {
                      s && (t.attr("srcset", s), n && t.attr("sizes", n)),
                          t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),
                          l.options.adaptiveHeight === !0 && l.setPosition(),
                          l.$slider.trigger("lazyLoaded", [l, t, o]),
                          l.progressiveLazyLoad();
                  }),
                  (r.onerror = function () {
                      e < 3
                          ? setTimeout(function () {
                                l.progressiveLazyLoad(e + 1);
                            }, 500)
                          : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad());
                  }),
                  (r.src = o))
                : l.$slider.trigger("allImagesLoaded", [l]);
        }),
        (e.prototype.refresh = function (e) {
            var t,
                o,
                s = this;
            (o = s.slideCount - s.options.slidesToShow),
                !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
                s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
                (t = s.currentSlide),
                s.destroy(!0),
                i.extend(s, s.initials, { currentSlide: t }),
                s.init(),
                e || s.changeSlide({ data: { message: "index", index: t } }, !1);
        }),
        (e.prototype.registerBreakpoints = function () {
            var e,
                t,
                o,
                s = this,
                n = s.options.responsive || null;
            if ("array" === i.type(n) && n.length) {
                s.respondTo = s.options.respondTo || "window";
                for (e in n)
                    if (((o = s.breakpoints.length - 1), n.hasOwnProperty(e))) {
                        for (t = n[e].breakpoint; o >= 0; ) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                        s.breakpoints.push(t), (s.breakpointSettings[t] = n[e].settings);
                    }
                s.breakpoints.sort(function (i, e) {
                    return s.options.mobileFirst ? i - e : e - i;
                });
            }
        }),
        (e.prototype.reinit = function () {
            var e = this;
            (e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide")),
                (e.slideCount = e.$slides.length),
                e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
                e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
                e.registerBreakpoints(),
                e.setProps(),
                e.setupInfinite(),
                e.buildArrows(),
                e.updateArrows(),
                e.initArrowEvents(),
                e.buildDots(),
                e.updateDots(),
                e.initDotEvents(),
                e.cleanUpSlideEvents(),
                e.initSlideEvents(),
                e.checkResponsive(!1, !0),
                e.options.focusOnSelect === !0 && i(e.$slideTrack).children().on("click.slick", e.selectHandler),
                e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
                e.setPosition(),
                e.focusHandler(),
                (e.paused = !e.options.autoplay),
                e.autoPlay(),
                e.$slider.trigger("reInit", [e]);
        }),
        (e.prototype.resize = function () {
            var e = this;
            i(window).width() !== e.windowWidth &&
                (clearTimeout(e.windowDelay),
                (e.windowDelay = window.setTimeout(function () {
                    (e.windowWidth = i(window).width()), e.checkResponsive(), e.unslicked || e.setPosition();
                }, 0)));
        }),
        (e.prototype.removeSlide = e.prototype.slickRemove = function (i, e, t) {
            var o = this;
            return (
                "boolean" == typeof i ? ((e = i), (i = e === !0 ? 0 : o.slideCount - 1)) : (i = e === !0 ? --i : i),
                !(o.slideCount < 1 || i < 0 || i > o.slideCount - 1) &&
                    (o.unload(),
                    t === !0 ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(),
                    (o.$slides = o.$slideTrack.children(this.options.slide)),
                    o.$slideTrack.children(this.options.slide).detach(),
                    o.$slideTrack.append(o.$slides),
                    (o.$slidesCache = o.$slides),
                    void o.reinit())
            );
        }),
        (e.prototype.setCSS = function (i) {
            var e,
                t,
                o = this,
                s = {};
            o.options.rtl === !0 && (i = -i),
                (e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
                (t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
                (s[o.positionProp] = i),
                o.transformsEnabled === !1
                    ? o.$slideTrack.css(s)
                    : ((s = {}), o.cssTransitions === !1 ? ((s[o.animType] = "translate(" + e + ", " + t + ")"), o.$slideTrack.css(s)) : ((s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)"), o.$slideTrack.css(s)));
        }),
        (e.prototype.setDimensions = function () {
            var i = this;
            i.options.vertical === !1
                ? i.options.centerMode === !0 && i.$list.css({ padding: "0px " + i.options.centerPadding })
                : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), i.options.centerMode === !0 && i.$list.css({ padding: i.options.centerPadding + " 0px" })),
                (i.listWidth = i.$list.width()),
                (i.listHeight = i.$list.height()),
                i.options.vertical === !1 && i.options.variableWidth === !1
                    ? ((i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow)), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length)))
                    : i.options.variableWidth === !0
                    ? i.$slideTrack.width(5e3 * i.slideCount)
                    : ((i.slideWidth = Math.ceil(i.listWidth)), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
            var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
            i.options.variableWidth === !1 && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
        }),
        (e.prototype.setFade = function () {
            var e,
                t = this;
            t.$slides.each(function (o, s) {
                (e = t.slideWidth * o * -1),
                    t.options.rtl === !0 ? i(s).css({ position: "relative", right: e, top: 0, zIndex: t.options.zIndex - 2, opacity: 0 }) : i(s).css({ position: "relative", left: e, top: 0, zIndex: t.options.zIndex - 2, opacity: 0 });
            }),
                t.$slides.eq(t.currentSlide).css({ zIndex: t.options.zIndex - 1, opacity: 1 });
        }),
        (e.prototype.setHeight = function () {
            var i = this;
            if (1 === i.options.slidesToShow && i.options.adaptiveHeight === !0 && i.options.vertical === !1) {
                var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                i.$list.css("height", e);
            }
        }),
        (e.prototype.setOption = e.prototype.slickSetOption = function () {
            var e,
                t,
                o,
                s,
                n,
                r = this,
                l = !1;
            if (
                ("object" === i.type(arguments[0])
                    ? ((o = arguments[0]), (l = arguments[1]), (n = "multiple"))
                    : "string" === i.type(arguments[0]) &&
                      ((o = arguments[0]), (s = arguments[1]), (l = arguments[2]), "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? (n = "responsive") : "undefined" != typeof arguments[1] && (n = "single")),
                "single" === n)
            )
                r.options[o] = s;
            else if ("multiple" === n)
                i.each(o, function (i, e) {
                    r.options[i] = e;
                });
            else if ("responsive" === n)
                for (t in s)
                    if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];
                    else {
                        for (e = r.options.responsive.length - 1; e >= 0; ) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                        r.options.responsive.push(s[t]);
                    }
            l && (r.unload(), r.reinit());
        }),
        (e.prototype.setPosition = function () {
            var i = this;
            i.setDimensions(), i.setHeight(), i.options.fade === !1 ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i]);
        }),
        (e.prototype.setProps = function () {
            var i = this,
                e = document.body.style;
            (i.positionProp = i.options.vertical === !0 ? "top" : "left"),
                "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"),
                (void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition) || (i.options.useCSS === !0 && (i.cssTransitions = !0)),
                i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : (i.options.zIndex = i.defaults.zIndex)),
                void 0 !== e.OTransform && ((i.animType = "OTransform"), (i.transformType = "-o-transform"), (i.transitionType = "OTransition"), void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)),
                void 0 !== e.MozTransform && ((i.animType = "MozTransform"), (i.transformType = "-moz-transform"), (i.transitionType = "MozTransition"), void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)),
                void 0 !== e.webkitTransform &&
                    ((i.animType = "webkitTransform"), (i.transformType = "-webkit-transform"), (i.transitionType = "webkitTransition"), void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)),
                void 0 !== e.msTransform && ((i.animType = "msTransform"), (i.transformType = "-ms-transform"), (i.transitionType = "msTransition"), void 0 === e.msTransform && (i.animType = !1)),
                void 0 !== e.transform && i.animType !== !1 && ((i.animType = "transform"), (i.transformType = "transform"), (i.transitionType = "transition")),
                (i.transformsEnabled = i.options.useTransform && null !== i.animType && i.animType !== !1);
        }),
        (e.prototype.setSlideClasses = function (i) {
            var e,
                t,
                o,
                s,
                n = this;
            if (((t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true")), n.$slides.eq(i).addClass("slick-current"), n.options.centerMode === !0)) {
                var r = n.options.slidesToShow % 2 === 0 ? 1 : 0;
                (e = Math.floor(n.options.slidesToShow / 2)),
                    n.options.infinite === !0 &&
                        (i >= e && i <= n.slideCount - 1 - e
                            ? n.$slides
                                  .slice(i - e + r, i + e + 1)
                                  .addClass("slick-active")
                                  .attr("aria-hidden", "false")
                            : ((o = n.options.slidesToShow + i),
                              t
                                  .slice(o - e + 1 + r, o + e + 2)
                                  .addClass("slick-active")
                                  .attr("aria-hidden", "false")),
                        0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")),
                    n.$slides.eq(i).addClass("slick-center");
            } else
                i >= 0 && i <= n.slideCount - n.options.slidesToShow
                    ? n.$slides
                          .slice(i, i + n.options.slidesToShow)
                          .addClass("slick-active")
                          .attr("aria-hidden", "false")
                    : t.length <= n.options.slidesToShow
                    ? t.addClass("slick-active").attr("aria-hidden", "false")
                    : ((s = n.slideCount % n.options.slidesToShow),
                      (o = n.options.infinite === !0 ? n.options.slidesToShow + i : i),
                      n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow
                          ? t
                                .slice(o - (n.options.slidesToShow - s), o + s)
                                .addClass("slick-active")
                                .attr("aria-hidden", "false")
                          : t
                                .slice(o, o + n.options.slidesToShow)
                                .addClass("slick-active")
                                .attr("aria-hidden", "false"));
            ("ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad) || n.lazyLoad();
        }),
        (e.prototype.setupInfinite = function () {
            var e,
                t,
                o,
                s = this;
            if ((s.options.fade === !0 && (s.options.centerMode = !1), s.options.infinite === !0 && s.options.fade === !1 && ((t = null), s.slideCount > s.options.slidesToShow))) {
                for (o = s.options.centerMode === !0 ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1)
                    (t = e - 1),
                        i(s.$slides[t])
                            .clone(!0)
                            .attr("id", "")
                            .attr("data-slick-index", t - s.slideCount)
                            .prependTo(s.$slideTrack)
                            .addClass("slick-cloned");
                for (e = 0; e < o + s.slideCount; e += 1)
                    (t = e),
                        i(s.$slides[t])
                            .clone(!0)
                            .attr("id", "")
                            .attr("data-slick-index", t + s.slideCount)
                            .appendTo(s.$slideTrack)
                            .addClass("slick-cloned");
                s.$slideTrack
                    .find(".slick-cloned")
                    .find("[id]")
                    .each(function () {
                        i(this).attr("id", "");
                    });
            }
        }),
        (e.prototype.interrupt = function (i) {
            var e = this;
            i || e.autoPlay(), (e.interrupted = i);
        }),
        (e.prototype.selectHandler = function (e) {
            var t = this,
                o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
                s = parseInt(o.attr("data-slick-index"));
            return s || (s = 0), t.slideCount <= t.options.slidesToShow ? void t.slideHandler(s, !1, !0) : void t.slideHandler(s);
        }),
        (e.prototype.slideHandler = function (i, e, t) {
            var o,
                s,
                n,
                r,
                l,
                d = null,
                a = this;
            if (((e = e || !1), !((a.animating === !0 && a.options.waitForAnimate === !0) || (a.options.fade === !0 && a.currentSlide === i))))
                return (
                    e === !1 && a.asNavFor(i),
                    (o = i),
                    (d = a.getLeft(o)),
                    (r = a.getLeft(a.currentSlide)),
                    (a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft),
                    a.options.infinite === !1 && a.options.centerMode === !1 && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)
                        ? void (
                              a.options.fade === !1 &&
                              ((o = a.currentSlide),
                              t !== !0 && a.slideCount > a.options.slidesToShow
                                  ? a.animateSlide(r, function () {
                                        a.postSlide(o);
                                    })
                                  : a.postSlide(o))
                          )
                        : a.options.infinite === !1 && a.options.centerMode === !0 && (i < 0 || i > a.slideCount - a.options.slidesToScroll)
                        ? void (
                              a.options.fade === !1 &&
                              ((o = a.currentSlide),
                              t !== !0 && a.slideCount > a.options.slidesToShow
                                  ? a.animateSlide(r, function () {
                                        a.postSlide(o);
                                    })
                                  : a.postSlide(o))
                          )
                        : (a.options.autoplay && clearInterval(a.autoPlayTimer),
                          (s =
                              o < 0
                                  ? a.slideCount % a.options.slidesToScroll !== 0
                                      ? a.slideCount - (a.slideCount % a.options.slidesToScroll)
                                      : a.slideCount + o
                                  : o >= a.slideCount
                                  ? a.slideCount % a.options.slidesToScroll !== 0
                                      ? 0
                                      : o - a.slideCount
                                  : o),
                          (a.animating = !0),
                          a.$slider.trigger("beforeChange", [a, a.currentSlide, s]),
                          (n = a.currentSlide),
                          (a.currentSlide = s),
                          a.setSlideClasses(a.currentSlide),
                          a.options.asNavFor && ((l = a.getNavTarget()), (l = l.slick("getSlick")), l.slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide)),
                          a.updateDots(),
                          a.updateArrows(),
                          a.options.fade === !0
                              ? (t !== !0
                                    ? (a.fadeSlideOut(n),
                                      a.fadeSlide(s, function () {
                                          a.postSlide(s);
                                      }))
                                    : a.postSlide(s),
                                void a.animateHeight())
                              : void (t !== !0 && a.slideCount > a.options.slidesToShow
                                    ? a.animateSlide(d, function () {
                                          a.postSlide(s);
                                      })
                                    : a.postSlide(s)))
                );
        }),
        (e.prototype.startLoad = function () {
            var i = this;
            i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()),
                i.options.dots === !0 && i.slideCount > i.options.slidesToShow && i.$dots.hide(),
                i.$slider.addClass("slick-loading");
        }),
        (e.prototype.swipeDirection = function () {
            var i,
                e,
                t,
                o,
                s = this;
            return (
                (i = s.touchObject.startX - s.touchObject.curX),
                (e = s.touchObject.startY - s.touchObject.curY),
                (t = Math.atan2(e, i)),
                (o = Math.round((180 * t) / Math.PI)),
                o < 0 && (o = 360 - Math.abs(o)),
                o <= 45 && o >= 0
                    ? s.options.rtl === !1
                        ? "left"
                        : "right"
                    : o <= 360 && o >= 315
                    ? s.options.rtl === !1
                        ? "left"
                        : "right"
                    : o >= 135 && o <= 225
                    ? s.options.rtl === !1
                        ? "right"
                        : "left"
                    : s.options.verticalSwiping === !0
                    ? o >= 35 && o <= 135
                        ? "down"
                        : "up"
                    : "vertical"
            );
        }),
        (e.prototype.swipeEnd = function (i) {
            var e,
                t,
                o = this;
            if (((o.dragging = !1), (o.swiping = !1), o.scrolling)) return (o.scrolling = !1), !1;
            if (((o.interrupted = !1), (o.shouldClick = !(o.touchObject.swipeLength > 10)), void 0 === o.touchObject.curX)) return !1;
            if ((o.touchObject.edgeHit === !0 && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe)) {
                switch ((t = o.swipeDirection())) {
                    case "left":
                    case "down":
                        (e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount()), (o.currentDirection = 0);
                        break;
                    case "right":
                    case "up":
                        (e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount()), (o.currentDirection = 1);
                }
                "vertical" != t && (o.slideHandler(e), (o.touchObject = {}), o.$slider.trigger("swipe", [o, t]));
            } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), (o.touchObject = {}));
        }),
        (e.prototype.swipeHandler = function (i) {
            var e = this;
            if (!(e.options.swipe === !1 || ("ontouchend" in document && e.options.swipe === !1) || (e.options.draggable === !1 && i.type.indexOf("mouse") !== -1)))
                switch (
                    ((e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1),
                    (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
                    e.options.verticalSwiping === !0 && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
                    i.data.action)
                ) {
                    case "start":
                        e.swipeStart(i);
                        break;
                    case "move":
                        e.swipeMove(i);
                        break;
                    case "end":
                        e.swipeEnd(i);
                }
        }),
        (e.prototype.swipeMove = function (i) {
            var e,
                t,
                o,
                s,
                n,
                r,
                l = this;
            return (
                (n = void 0 !== i.originalEvent ? i.originalEvent.touches : null),
                !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
                    ((e = l.getLeft(l.currentSlide)),
                    (l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX),
                    (l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY),
                    (l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2)))),
                    (r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2)))),
                    !l.options.verticalSwiping && !l.swiping && r > 4
                        ? ((l.scrolling = !0), !1)
                        : (l.options.verticalSwiping === !0 && (l.touchObject.swipeLength = r),
                          (t = l.swipeDirection()),
                          void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && ((l.swiping = !0), i.preventDefault()),
                          (s = (l.options.rtl === !1 ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
                          l.options.verticalSwiping === !0 && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
                          (o = l.touchObject.swipeLength),
                          (l.touchObject.edgeHit = !1),
                          l.options.infinite === !1 &&
                              ((0 === l.currentSlide && "right" === t) || (l.currentSlide >= l.getDotCount() && "left" === t)) &&
                              ((o = l.touchObject.swipeLength * l.options.edgeFriction), (l.touchObject.edgeHit = !0)),
                          l.options.vertical === !1 ? (l.swipeLeft = e + o * s) : (l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s),
                          l.options.verticalSwiping === !0 && (l.swipeLeft = e + o * s),
                          l.options.fade !== !0 && l.options.touchMove !== !1 && (l.animating === !0 ? ((l.swipeLeft = null), !1) : void l.setCSS(l.swipeLeft))))
            );
        }),
        (e.prototype.swipeStart = function (i) {
            var e,
                t = this;
            return (
                (t.interrupted = !0),
                1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow
                    ? ((t.touchObject = {}), !1)
                    : (void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]),
                      (t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX),
                      (t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY),
                      void (t.dragging = !0))
            );
        }),
        (e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
            var i = this;
            null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit());
        }),
        (e.prototype.unload = function () {
            var e = this;
            i(".slick-cloned", e.$slider).remove(),
                e.$dots && e.$dots.remove(),
                e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(),
                e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(),
                e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
        }),
        (e.prototype.unslick = function (i) {
            var e = this;
            e.$slider.trigger("unslick", [e, i]), e.destroy();
        }),
        (e.prototype.updateArrows = function () {
            var i,
                e = this;
            (i = Math.floor(e.options.slidesToShow / 2)),
                e.options.arrows === !0 &&
                    e.slideCount > e.options.slidesToShow &&
                    !e.options.infinite &&
                    (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                    e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                    0 === e.currentSlide
                        ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))
                        : e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1
                        ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))
                        : e.currentSlide >= e.slideCount - 1 &&
                          e.options.centerMode === !0 &&
                          (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
        }),
        (e.prototype.updateDots = function () {
            var i = this;
            null !== i.$dots &&
                (i.$dots.find("li").removeClass("slick-active").end(),
                i.$dots
                    .find("li")
                    .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
                    .addClass("slick-active"));
        }),
        (e.prototype.visibility = function () {
            var i = this;
            i.options.autoplay && (document[i.hidden] ? (i.interrupted = !0) : (i.interrupted = !1));
        }),
        (i.fn.slick = function () {
            var i,
                t,
                o = this,
                s = arguments[0],
                n = Array.prototype.slice.call(arguments, 1),
                r = o.length;
            for (i = 0; i < r; i++) if (("object" == typeof s || "undefined" == typeof s ? (o[i].slick = new e(o[i], s)) : (t = o[i].slick[s].apply(o[i].slick, n)), "undefined" != typeof t)) return t;
            return o;
        });
});

/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
!(function (h, i, n, a) {
    function l(t, e) {
        (this.settings = null),
            (this.options = h.extend({}, l.Defaults, e)),
            (this.$element = h(t)),
            (this._handlers = {}),
            (this._plugins = {}),
            (this._supress = {}),
            (this._current = null),
            (this._speed = null),
            (this._coordinates = []),
            (this._breakpoint = null),
            (this._width = null),
            (this._items = []),
            (this._clones = []),
            (this._mergers = []),
            (this._widths = []),
            (this._invalidated = {}),
            (this._pipe = []),
            (this._drag = { time: null, target: null, pointer: null, stage: { start: null, current: null }, direction: null }),
            (this._states = { current: {}, tags: { initializing: ["busy"], animating: ["busy"], dragging: ["interacting"] } }),
            h.each(
                ["onResize", "onThrottledResize"],
                h.proxy(function (t, e) {
                    this._handlers[e] = h.proxy(this[e], this);
                }, this)
            ),
            h.each(
                l.Plugins,
                h.proxy(function (t, e) {
                    this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this);
                }, this)
            ),
            h.each(
                l.Workers,
                h.proxy(function (t, e) {
                    this._pipe.push({ filter: e.filter, run: h.proxy(e.run, this) });
                }, this)
            ),
            this.setup(),
            this.initialize();
    }
    (l.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        checkVisibility: !0,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: i,
        fallbackEasing: "swing",
        slideTransition: "",
        info: !1,
        doubleclone: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab",
    }),
        (l.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
        (l.Type = { Event: "event", State: "state" }),
        (l.Plugins = {}),
        (l.Workers = [
            {
                filter: ["width", "settings"],
                run: function () {
                    this._width = this.$element.width();
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function (t) {
                    t.current = this._items && this._items[this.relative(this._current)];
                },
            },
            {
                filter: ["items", "settings"],
                run: function () {
                    this.$stage.children(".cloned").remove();
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function (t) {
                    var e = this.settings.margin || "",
                        i = !this.settings.autoWidth,
                        s = this.settings.rtl,
                        n = { width: "auto", "margin-left": s ? e : "", "margin-right": s ? "" : e };
                    i || this.$stage.children().css(n), (t.css = n);
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function (t) {
                    var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                        i = null,
                        s = this._items.length,
                        n = !this.settings.autoWidth,
                        o = [];
                    for (t.items = { merge: !1, width: e }; s--; )
                        (i = this._mergers[s]), (i = (this.settings.mergeFit && Math.min(i, this.settings.items)) || i), (t.items.merge = 1 < i || t.items.merge), (o[s] = n ? e * i : this._items[s].width());
                    this._widths = o;
                },
            },
            {
                filter: ["items", "settings"],
                run: function () {
                    var t = [],
                        e = this._items,
                        i = this.settings,
                        s = Math.max(2 * i.items, 4),
                        n = 2 * Math.ceil(e.length / 2),
                        o = i.loop && e.length ? (i.rewind ? s : Math.max(s, n)) : 0,
                        r = "",
                        a = "";
                    for (i.doubleclone || (o /= 2); 0 < o; )
                        t.push(this.normalize(t.length / 2, !0)), (r += e[t[t.length - 1]][0].outerHTML), t.push(this.normalize(e.length - 1 - (t.length - 1) / 2, !0)), (a = e[t[t.length - 1]][0].outerHTML + a), (o -= 1);
                    (this._clones = t), h(r).addClass("cloned").appendTo(this.$stage), h(a).addClass("cloned").prependTo(this.$stage);
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function () {
                    for (var t = this.settings.rtl ? 1 : -1, e = this._clones.length + this._items.length, i = -1, s = 0, n = 0, o = []; ++i < e; )
                        (s = o[i - 1] || 0), (n = this._widths[this.relative(i)] + this.settings.margin), o.push(s + n * t);
                    this._coordinates = o;
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function () {
                    var t = this.settings.stagePadding,
                        e = this._coordinates,
                        i = { width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t, "padding-left": t || "", "padding-right": t || "" };
                    this.$stage.css(i);
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function (t) {
                    var e = this._coordinates.length,
                        i = !this.settings.autoWidth,
                        s = this.$stage.children();
                    if (i && t.items.merge) for (; e--; ) (t.css.width = this._widths[this.relative(e)]), s.eq(e).css(t.css);
                    else i && ((t.css.width = t.items.width), s.css(t.css));
                },
            },
            {
                filter: ["items"],
                run: function () {
                    this._coordinates.length < 1 && this.$stage.removeAttr("style");
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function (t) {
                    (t.current = t.current ? this.$stage.children().index(t.current) : 0), (t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current))), this.reset(t.current);
                },
            },
            {
                filter: ["position"],
                run: function () {
                    this.animate(this.coordinates(this._current));
                },
            },
            {
                filter: ["width", "position", "items", "settings"],
                run: function () {
                    var t,
                        e,
                        i,
                        s,
                        n = this.settings.rtl ? 1 : -1,
                        o = 2 * this.settings.stagePadding,
                        r = this.coordinates(this.current()) + o,
                        a = r + this.width() * n,
                        h = [];
                    for (i = 0, s = this._coordinates.length; i < s; i++)
                        (t = this._coordinates[i - 1] || 0), (e = Math.abs(this._coordinates[i]) + o * n), ((this.op(t, "<=", r) && this.op(t, ">", a)) || (this.op(e, "<", r) && this.op(e, ">", a))) && h.push(i);
                    this.$stage.children(".active").removeClass("active"),
                        this.$stage.children(":eq(" + h.join("), :eq(") + ")").addClass("active"),
                        this.$stage.children(".center").removeClass("center"),
                        this.settings.center && this.$stage.children().eq(this.current()).addClass("center");
                },
            },
        ]),
        (l.prototype.initializeStage = function () {
            (this.$stage = this.$element.find("." + this.settings.stageClass)),
                this.$stage.length ||
                    (this.$element.addClass(this.options.loadingClass),
                    (this.$stage = h("<" + this.settings.stageElement + ">", { class: this.settings.stageClass }).wrap(h("<div/>", { class: this.settings.stageOuterClass }))),
                    this.$element.append(this.$stage.parent()));
        }),
        (l.prototype.initializeItems = function () {
            var t = this.$element.find(".owl-item");
            if (t.length)
                return (
                    (this._items = t.get().map(function (t) {
                        return h(t);
                    })),
                    (this._mergers = this._items.map(function () {
                        return 1;
                    })),
                    void this.refresh()
                );
            this.replace(this.$element.children().not(this.$stage.parent())), this.isVisible() ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass);
        }),
        (l.prototype.initialize = function () {
            var t, e, i;
            this.enter("initializing"),
                this.trigger("initialize"),
                this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
                this.settings.autoWidth &&
                    !this.is("pre-loading") &&
                    ((t = this.$element.find("img")), (e = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : a), (i = this.$element.children(e).width()), t.length && i <= 0 && this.preloadAutoWidthImages(t));
            this.initializeStage(), this.initializeItems(), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized");
        }),
        (l.prototype.isVisible = function () {
            return !this.settings.checkVisibility || this.$element.is(":visible");
        }),
        (l.prototype.setup = function () {
            var e = this.viewport(),
                t = this.options.responsive,
                i = -1,
                s = null;
            t
                ? (h.each(t, function (t) {
                      t <= e && i < t && (i = Number(t));
                  }),
                  "function" == typeof (s = h.extend({}, this.options, t[i])).stagePadding && (s.stagePadding = s.stagePadding()),
                  delete s.responsive,
                  s.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + i)))
                : (s = h.extend({}, this.options)),
                this.trigger("change", { property: { name: "settings", value: s } }),
                (this._breakpoint = i),
                (this.settings = s),
                this.invalidate("settings"),
                this.trigger("changed", { property: { name: "settings", value: this.settings } });
        }),
        (l.prototype.optionsLogic = function () {
            this.settings.autoWidth && ((this.settings.stagePadding = !1), (this.settings.merge = !1));
        }),
        (l.prototype.prepare = function (t) {
            var e = this.trigger("prepare", { content: t });
            return (
                e.data ||
                    (e.data = h("<" + this.settings.itemElement + "/>")
                        .addClass(this.options.itemClass)
                        .addClass(h(t).data("owl-parentclass"))
                        .append(t)),
                this.trigger("prepared", { content: e.data }),
                e.data
            );
        }),
        (l.prototype.update = function () {
            for (
                var t = 0,
                    e = this._pipe.length,
                    i = h.proxy(function (t) {
                        return this[t];
                    }, this._invalidated),
                    s = {};
                t < e;

            )
                (this._invalidated.all || 0 < h.grep(this._pipe[t].filter, i).length) && this._pipe[t].run(s), t++;
            (this._invalidated = {}), this.is("valid") || this.enter("valid");
        }),
        (l.prototype.width = function (t) {
            switch ((t = t || l.Width.Default)) {
                case l.Width.Inner:
                case l.Width.Outer:
                    return this._width;
                default:
                    return this._width - 2 * this.settings.stagePadding + this.settings.margin;
            }
        }),
        (l.prototype.refresh = function () {
            this.enter("refreshing"),
                this.trigger("refresh"),
                this.setup(),
                this.optionsLogic(),
                this.$element.addClass(this.options.refreshClass),
                this.update(),
                this.$element.removeClass(this.options.refreshClass),
                this.leave("refreshing"),
                this.trigger("refreshed");
        }),
        (l.prototype.onThrottledResize = function () {
            i.clearTimeout(this.resizeTimer), (this.resizeTimer = i.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate));
        }),
        (l.prototype.onResize = function () {
            return (
                !!this._items.length &&
                this._width !== this.$element.width() &&
                !!this.isVisible() &&
                (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))
            );
        }),
        (l.prototype.registerEventHandlers = function () {
            h.support.transition && this.$stage.on(h.support.transition.end + ".owl.core", h.proxy(this.onTransitionEnd, this)),
                !1 !== this.settings.responsive && this.on(i, "resize", this._handlers.onThrottledResize),
                this.settings.mouseDrag &&
                    (this.$element.addClass(this.options.dragClass),
                    this.$stage.on("mousedown.owl.core", h.proxy(this.onDragStart, this)),
                    this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
                        return !1;
                    })),
                this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", h.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", h.proxy(this.onDragEnd, this)));
        }),
        (l.prototype.onDragStart = function (t) {
            var e = null;
            3 !== t.which &&
                ((e = h.support.transform
                    ? {
                          x: (e = this.$stage
                              .css("transform")
                              .replace(/.*\(|\)| /g, "")
                              .split(","))[16 === e.length ? 12 : 4],
                          y: e[16 === e.length ? 13 : 5],
                      }
                    : ((e = this.$stage.position()), { x: this.settings.rtl ? e.left + this.$stage.width() - this.width() + this.settings.margin : e.left, y: e.top })),
                this.is("animating") && (h.support.transform ? this.animate(e.x) : this.$stage.stop(), this.invalidate("position")),
                this.$element.toggleClass(this.options.grabClass, "mousedown" === t.type),
                this.speed(0),
                (this._drag.time = new Date().getTime()),
                (this._drag.target = h(t.target)),
                (this._drag.stage.start = e),
                (this._drag.stage.current = e),
                (this._drag.pointer = this.pointer(t)),
                h(n).on("mouseup.owl.core touchend.owl.core", h.proxy(this.onDragEnd, this)),
                h(n).one(
                    "mousemove.owl.core touchmove.owl.core",
                    h.proxy(function (t) {
                        var e = this.difference(this._drag.pointer, this.pointer(t));
                        h(n).on("mousemove.owl.core touchmove.owl.core", h.proxy(this.onDragMove, this)), (Math.abs(e.x) < Math.abs(e.y) && this.is("valid")) || (t.preventDefault(), this.enter("dragging"), this.trigger("drag"));
                    }, this)
                ));
        }),
        (l.prototype.onDragMove = function (t) {
            var e = null,
                i = null,
                s = null,
                n = this.difference(this._drag.pointer, this.pointer(t)),
                o = this.difference(this._drag.stage.start, n);
            this.is("dragging") &&
                (t.preventDefault(),
                this.settings.loop
                    ? ((e = this.coordinates(this.minimum())), (i = this.coordinates(this.maximum() + 1) - e), (o.x = ((((o.x - e) % i) + i) % i) + e))
                    : ((e = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum())),
                      (i = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum())),
                      (s = this.settings.pullDrag ? (-1 * n.x) / 5 : 0),
                      (o.x = Math.max(Math.min(o.x, e + s), i + s))),
                (this._drag.stage.current = o),
                this.animate(o.x));
        }),
        (l.prototype.onDragEnd = function (t) {
            var e = this.difference(this._drag.pointer, this.pointer(t)),
                i = this._drag.stage.current,
                s = (0 < e.x) ^ this.settings.rtl ? "left" : "right";
            h(n).off(".owl.core"),
                this.$element.removeClass(this.options.grabClass),
                ((0 !== e.x && this.is("dragging")) || !this.is("valid")) &&
                    (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
                    this.current(this.closest(i.x, 0 !== e.x ? s : this._drag.direction)),
                    this.invalidate("position"),
                    this.update(),
                    (this._drag.direction = s),
                    (3 < Math.abs(e.x) || 300 < new Date().getTime() - this._drag.time) &&
                        this._drag.target.one("click.owl.core", function () {
                            return !1;
                        })),
                this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"));
        }),
        (l.prototype.closest = function (i, s) {
            var n = -1,
                o = this.width(),
                r = this.coordinates();
            return (
                this.settings.freeDrag ||
                    h.each(
                        r,
                        h.proxy(function (t, e) {
                            return (
                                "left" === s && e - 30 < i && i < e + 30
                                    ? (n = t)
                                    : "right" === s && e - o - 30 < i && i < e - o + 30
                                    ? (n = t + 1)
                                    : this.op(i, "<", e) && this.op(i, ">", r[t + 1] !== a ? r[t + 1] : e - o) && (n = "left" === s ? t + 1 : t),
                                -1 === n
                            );
                        }, this)
                    ),
                this.settings.loop || (this.op(i, ">", r[this.minimum()]) ? (n = i = this.minimum()) : this.op(i, "<", r[this.maximum()]) && (n = i = this.maximum())),
                n
            );
        }),
        (l.prototype.animate = function (t) {
            var e = 0 < this.speed();
            this.is("animating") && this.onTransitionEnd(),
                e && (this.enter("animating"), this.trigger("translate")),
                h.support.transform3d && h.support.transition
                    ? this.$stage.css({ transform: "translate3d(" + t + "px,0px,0px)", transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "") })
                    : e
                    ? this.$stage.animate({ left: t + "px" }, this.speed(), this.settings.fallbackEasing, h.proxy(this.onTransitionEnd, this))
                    : this.$stage.css({ left: t + "px" });
        }),
        (l.prototype.is = function (t) {
            return this._states.current[t] && 0 < this._states.current[t];
        }),
        (l.prototype.current = function (t) {
            if (t === a) return this._current;
            if (0 === this._items.length) return a;
            if (((t = this.normalize(t)), this._current !== t)) {
                var e = this.trigger("change", { property: { name: "position", value: t } });
                e.data !== a && (t = this.normalize(e.data)), (this._current = t), this.invalidate("position"), this.trigger("changed", { property: { name: "position", value: this._current } });
            }
            return this._current;
        }),
        (l.prototype.invalidate = function (t) {
            return (
                "string" === h.type(t) && ((this._invalidated[t] = !0), this.is("valid") && this.leave("valid")),
                h.map(this._invalidated, function (t, e) {
                    return e;
                })
            );
        }),
        (l.prototype.reset = function (t) {
            (t = this.normalize(t)) !== a && ((this._speed = 0), (this._current = t), this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]));
        }),
        (l.prototype.normalize = function (t, e) {
            var i = this._items.length,
                s = e ? 0 : this._clones.length;
            return !this.isNumeric(t) || i < 1 ? (t = a) : (t < 0 || i + s <= t) && (t = ((((t - s / 2) % i) + i) % i) + s / 2), t;
        }),
        (l.prototype.relative = function (t) {
            return (t -= this._clones.length / 2), this.normalize(t, !0);
        }),
        (l.prototype.maximum = function (t) {
            var e,
                i,
                s,
                n = this.settings,
                o = this._coordinates.length;
            if (n.loop) o = this._clones.length / 2 + this._items.length - 1;
            else if (n.autoWidth || n.merge) {
                if ((e = this._items.length)) for (i = this._items[--e].width(), s = this.$element.width(); e-- && !(s < (i += this._items[e].width() + this.settings.margin)); );
                o = e + 1;
            } else o = n.center ? this._items.length - 1 : this._items.length - n.items;
            return t && (o -= this._clones.length / 2), Math.max(o, 0);
        }),
        (l.prototype.minimum = function (t) {
            return t ? 0 : this._clones.length / 2;
        }),
        (l.prototype.items = function (t) {
            return t === a ? this._items.slice() : ((t = this.normalize(t, !0)), this._items[t]);
        }),
        (l.prototype.mergers = function (t) {
            return t === a ? this._mergers.slice() : ((t = this.normalize(t, !0)), this._mergers[t]);
        }),
        (l.prototype.clones = function (i) {
            function s(t) {
                return t % 2 == 0 ? n + t / 2 : e - (t + 1) / 2;
            }
            var e = this._clones.length / 2,
                n = e + this._items.length;
            return i === a
                ? h.map(this._clones, function (t, e) {
                      return s(e);
                  })
                : h.map(this._clones, function (t, e) {
                      return t === i ? s(e) : null;
                  });
        }),
        (l.prototype.speed = function (t) {
            return t !== a && (this._speed = t), this._speed;
        }),
        (l.prototype.coordinates = function (t) {
            var e,
                i = 1,
                s = t - 1;
            return t === a
                ? h.map(
                      this._coordinates,
                      h.proxy(function (t, e) {
                          return this.coordinates(e);
                      }, this)
                  )
                : (this.settings.center ? (this.settings.rtl && ((i = -1), (s = t + 1)), (e = this._coordinates[t]), (e += ((this.width() - e + (this._coordinates[s] || 0)) / 2) * i)) : (e = this._coordinates[s] || 0), (e = Math.ceil(e)));
        }),
        (l.prototype.duration = function (t, e, i) {
            return 0 === i ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed);
        }),
        (l.prototype.to = function (t, e) {
            var i = this.current(),
                s = null,
                n = t - this.relative(i),
                o = (0 < n) - (n < 0),
                r = this._items.length,
                a = this.minimum(),
                h = this.maximum();
            this.settings.loop
                ? (!this.settings.rewind && Math.abs(n) > r / 2 && (n += -1 * o * r), (s = (((((t = i + n) - a) % r) + r) % r) + a) !== t && s - n <= h && 0 < s - n && ((i = s - n), (t = s), this.reset(i)))
                : (t = this.settings.rewind ? ((t % (h += 1)) + h) % h : Math.max(a, Math.min(h, t))),
                this.speed(this.duration(i, t, e)),
                this.current(t),
                this.isVisible() && this.update();
        }),
        (l.prototype.next = function (t) {
            (t = t || !1), this.to(this.relative(this.current()) + 1, t);
        }),
        (l.prototype.prev = function (t) {
            (t = t || !1), this.to(this.relative(this.current()) - 1, t);
        }),
        (l.prototype.onTransitionEnd = function (t) {
            if (t !== a && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0))) return !1;
            this.leave("animating"), this.trigger("translated");
        }),
        (l.prototype.viewport = function () {
            var t;
            return (
                this.options.responsiveBaseElement !== i
                    ? (t = h(this.options.responsiveBaseElement).width())
                    : i.innerWidth
                    ? (t = i.innerWidth)
                    : n.documentElement && n.documentElement.clientWidth
                    ? (t = n.documentElement.clientWidth)
                    : console.warn("Can not detect viewport width."),
                t
            );
        }),
        (l.prototype.replace = function (t) {
            this.$stage.empty(),
                (this._items = []),
                t && (t = t instanceof jQuery ? t : h(t)),
                this.settings.nestedItemSelector && (t = t.find("." + this.settings.nestedItemSelector)),
                t
                    .filter(function () {
                        return 1 === this.nodeType;
                    })
                    .each(
                        h.proxy(function (t, e) {
                            (e = this.prepare(e)), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1);
                        }, this)
                    ),
                this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0),
                this.invalidate("items");
        }),
        (l.prototype.add = function (t, e) {
            var i = this.relative(this._current);
            (e = e === a ? this._items.length : this.normalize(e, !0)),
                (t = t instanceof jQuery ? t : h(t)),
                this.trigger("add", { content: t, position: e }),
                (t = this.prepare(t)),
                0 === this._items.length || e === this._items.length
                    ? (0 === this._items.length && this.$stage.append(t),
                      0 !== this._items.length && this._items[e - 1].after(t),
                      this._items.push(t),
                      this._mergers.push(1 * t.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1))
                    : (this._items[e].before(t), this._items.splice(e, 0, t), this._mergers.splice(e, 0, 1 * t.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)),
                this._items[i] && this.reset(this._items[i].index()),
                this.invalidate("items"),
                this.trigger("added", { content: t, position: e });
        }),
        (l.prototype.remove = function (t) {
            (t = this.normalize(t, !0)) !== a &&
                (this.trigger("remove", { content: this._items[t], position: t }),
                this._items[t].remove(),
                this._items.splice(t, 1),
                this._mergers.splice(t, 1),
                this.invalidate("items"),
                this.trigger("removed", { content: null, position: t }));
        }),
        (l.prototype.preloadAutoWidthImages = function (t) {
            t.each(
                h.proxy(function (t, e) {
                    this.enter("pre-loading"),
                        (e = h(e)),
                        h(new Image())
                            .one(
                                "load",
                                h.proxy(function (t) {
                                    e.attr("src", t.target.src), e.css("opacity", 1), this.leave("pre-loading"), this.is("pre-loading") || this.is("initializing") || this.refresh();
                                }, this)
                            )
                            .attr("src", e.attr("src") || e.attr("data-src") || e.attr("data-src-retina"));
                }, this)
            );
        }),
        (l.prototype.destroy = function () {
            for (var t in (this.$element.off(".owl.core"),
            this.$stage.off(".owl.core"),
            h(n).off(".owl.core"),
            !1 !== this.settings.responsive && (i.clearTimeout(this.resizeTimer), this.off(i, "resize", this._handlers.onThrottledResize)),
            this._plugins))
                this._plugins[t].destroy();
            this.$stage.children(".cloned").remove(),
                this.$stage.unwrap(),
                this.$stage.children().contents().unwrap(),
                this.$stage.children().unwrap(),
                this.$stage.remove(),
                this.$element
                    .removeClass(this.options.refreshClass)
                    .removeClass(this.options.loadingClass)
                    .removeClass(this.options.loadedClass)
                    .removeClass(this.options.rtlClass)
                    .removeClass(this.options.dragClass)
                    .removeClass(this.options.grabClass)
                    .attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), ""))
                    .removeData("owl.carousel");
        }),
        (l.prototype.op = function (t, e, i) {
            var s = this.settings.rtl;
            switch (e) {
                case "<":
                    return s ? i < t : t < i;
                case ">":
                    return s ? t < i : i < t;
                case ">=":
                    return s ? t <= i : i <= t;
                case "<=":
                    return s ? i <= t : t <= i;
            }
        }),
        (l.prototype.on = function (t, e, i, s) {
            t.addEventListener ? t.addEventListener(e, i, s) : t.attachEvent && t.attachEvent("on" + e, i);
        }),
        (l.prototype.off = function (t, e, i, s) {
            t.removeEventListener ? t.removeEventListener(e, i, s) : t.detachEvent && t.detachEvent("on" + e, i);
        }),
        (l.prototype.trigger = function (t, e, i, s, n) {
            var o = { item: { count: this._items.length, index: this.current() } },
                r = h.camelCase(
                    h
                        .grep(["on", t, i], function (t) {
                            return t;
                        })
                        .join("-")
                        .toLowerCase()
                ),
                a = h.Event([t, "owl", i || "carousel"].join(".").toLowerCase(), h.extend({ relatedTarget: this }, o, e));
            return (
                this._supress[t] ||
                    (h.each(this._plugins, function (t, e) {
                        e.onTrigger && e.onTrigger(a);
                    }),
                    this.register({ type: l.Type.Event, name: t }),
                    this.$element.trigger(a),
                    this.settings && "function" == typeof this.settings[r] && this.settings[r].call(this, a)),
                a
            );
        }),
        (l.prototype.enter = function (t) {
            h.each(
                [t].concat(this._states.tags[t] || []),
                h.proxy(function (t, e) {
                    this._states.current[e] === a && (this._states.current[e] = 0), this._states.current[e]++;
                }, this)
            );
        }),
        (l.prototype.leave = function (t) {
            h.each(
                [t].concat(this._states.tags[t] || []),
                h.proxy(function (t, e) {
                    this._states.current[e]--;
                }, this)
            );
        }),
        (l.prototype.register = function (i) {
            if (i.type === l.Type.Event) {
                if ((h.event.special[i.name] || (h.event.special[i.name] = {}), !h.event.special[i.name].owl)) {
                    var e = h.event.special[i.name]._default;
                    (h.event.special[i.name]._default = function (t) {
                        return !e || !e.apply || (t.namespace && -1 !== t.namespace.indexOf("owl")) ? t.namespace && -1 < t.namespace.indexOf("owl") : e.apply(this, arguments);
                    }),
                        (h.event.special[i.name].owl = !0);
                }
            } else
                i.type === l.Type.State &&
                    (this._states.tags[i.name] ? (this._states.tags[i.name] = this._states.tags[i.name].concat(i.tags)) : (this._states.tags[i.name] = i.tags),
                    (this._states.tags[i.name] = h.grep(
                        this._states.tags[i.name],
                        h.proxy(function (t, e) {
                            return h.inArray(t, this._states.tags[i.name]) === e;
                        }, this)
                    )));
        }),
        (l.prototype.suppress = function (t) {
            h.each(
                t,
                h.proxy(function (t, e) {
                    this._supress[e] = !0;
                }, this)
            );
        }),
        (l.prototype.release = function (t) {
            h.each(
                t,
                h.proxy(function (t, e) {
                    delete this._supress[e];
                }, this)
            );
        }),
        (l.prototype.pointer = function (t) {
            var e = { x: null, y: null };
            return (
                (t = (t = t.originalEvent || t || i.event).touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t).pageX
                    ? ((e.x = t.pageX), (e.y = t.pageY))
                    : ((e.x = t.clientX), (e.y = t.clientY)),
                e
            );
        }),
        (l.prototype.isNumeric = function (t) {
            return !isNaN(parseFloat(t));
        }),
        (l.prototype.difference = function (t, e) {
            return { x: t.x - e.x, y: t.y - e.y };
        }),
        (h.fn.owlCarousel = function (e) {
            var s = Array.prototype.slice.call(arguments, 1);
            return this.each(function () {
                var t = h(this),
                    i = t.data("owl.carousel");
                i ||
                    ((i = new l(this, "object" == typeof e && e)),
                    t.data("owl.carousel", i),
                    h.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (t, e) {
                        i.register({ type: l.Type.Event, name: e }),
                            i.$element.on(
                                e + ".owl.carousel.core",
                                h.proxy(function (t) {
                                    t.namespace && t.relatedTarget !== this && (this.suppress([e]), i[e].apply(this, [].slice.call(arguments, 1)), this.release([e]));
                                }, i)
                            );
                    })),
                    "string" == typeof e && "_" !== e.charAt(0) && i[e].apply(i, s);
            });
        }),
        (h.fn.owlCarousel.Constructor = l);
})(window.Zepto || window.jQuery, window, document),
    (function (e, i) {
        var s = function (t) {
            (this._core = t),
                (this._interval = null),
                (this._visible = null),
                (this._handlers = {
                    "initialized.owl.carousel": e.proxy(function (t) {
                        t.namespace && this._core.settings.autoRefresh && this.watch();
                    }, this),
                }),
                (this._core.options = e.extend({}, s.Defaults, this._core.options)),
                this._core.$element.on(this._handlers);
        };
        (s.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
            (s.prototype.watch = function () {
                this._interval || ((this._visible = this._core.isVisible()), (this._interval = i.setInterval(e.proxy(this.refresh, this), this._core.settings.autoRefreshInterval)));
            }),
            (s.prototype.refresh = function () {
                this._core.isVisible() !== this._visible && ((this._visible = !this._visible), this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh());
            }),
            (s.prototype.destroy = function () {
                var t, e;
                for (t in (i.clearInterval(this._interval), this._handlers)) this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (e.fn.owlCarousel.Constructor.Plugins.AutoRefresh = s);
    })(window.Zepto || window.jQuery, window, document),
    (function (a, o) {
        var e = function (t) {
            (this._core = t),
                (this._loaded = []),
                (this._handlers = {
                    "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function (t) {
                        if (t.namespace && this._core.settings && this._core.settings.lazyLoad && ((t.property && "position" == t.property.name) || "initialized" == t.type)) {
                            var e = this._core.settings,
                                i = (e.center && Math.ceil(e.items / 2)) || e.items,
                                s = (e.center && -1 * i) || 0,
                                n = (t.property && void 0 !== t.property.value ? t.property.value : this._core.current()) + s,
                                o = this._core.clones().length,
                                r = a.proxy(function (t, e) {
                                    this.load(e);
                                }, this);
                            for (0 < e.lazyLoadEager && ((i += e.lazyLoadEager), e.loop && ((n -= e.lazyLoadEager), i++)); s++ < i; ) this.load(o / 2 + this._core.relative(n)), o && a.each(this._core.clones(this._core.relative(n)), r), n++;
                        }
                    }, this),
                }),
                (this._core.options = a.extend({}, e.Defaults, this._core.options)),
                this._core.$element.on(this._handlers);
        };
        (e.Defaults = { lazyLoad: !1, lazyLoadEager: 0 }),
            (e.prototype.load = function (t) {
                var e = this._core.$stage.children().eq(t),
                    i = e && e.find(".owl-lazy");
                !i ||
                    -1 < a.inArray(e.get(0), this._loaded) ||
                    (i.each(
                        a.proxy(function (t, e) {
                            var i,
                                s = a(e),
                                n = (1 < o.devicePixelRatio && s.attr("data-src-retina")) || s.attr("data-src") || s.attr("data-srcset");
                            this._core.trigger("load", { element: s, url: n }, "lazy"),
                                s.is("img")
                                    ? s
                                          .one(
                                              "load.owl.lazy",
                                              a.proxy(function () {
                                                  s.css("opacity", 1), this._core.trigger("loaded", { element: s, url: n }, "lazy");
                                              }, this)
                                          )
                                          .attr("src", n)
                                    : s.is("source")
                                    ? s
                                          .one(
                                              "load.owl.lazy",
                                              a.proxy(function () {
                                                  this._core.trigger("loaded", { element: s, url: n }, "lazy");
                                              }, this)
                                          )
                                          .attr("srcset", n)
                                    : (((i = new Image()).onload = a.proxy(function () {
                                          s.css({ "background-image": 'url("' + n + '")', opacity: "1" }), this._core.trigger("loaded", { element: s, url: n }, "lazy");
                                      }, this)),
                                      (i.src = n));
                        }, this)
                    ),
                    this._loaded.push(e.get(0)));
            }),
            (e.prototype.destroy = function () {
                var t, e;
                for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.Lazy = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (r, i) {
        var s = function (t) {
            (this._core = t),
                (this._previousHeight = null),
                (this._handlers = {
                    "initialized.owl.carousel refreshed.owl.carousel": r.proxy(function (t) {
                        t.namespace && this._core.settings.autoHeight && this.update();
                    }, this),
                    "changed.owl.carousel": r.proxy(function (t) {
                        t.namespace && this._core.settings.autoHeight && "position" === t.property.name && this.update();
                    }, this),
                    "loaded.owl.lazy": r.proxy(function (t) {
                        t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update();
                    }, this),
                }),
                (this._core.options = r.extend({}, s.Defaults, this._core.options)),
                this._core.$element.on(this._handlers),
                (this._intervalId = null);
            var e = this;
            r(i).on("load", function () {
                e._core.settings.autoHeight && e.update();
            }),
                r(i).resize(function () {
                    e._core.settings.autoHeight &&
                        (null != e._intervalId && clearTimeout(e._intervalId),
                        (e._intervalId = setTimeout(function () {
                            e.update();
                        }, 250)));
                });
        };
        (s.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
            (s.prototype.update = function () {
                var t = this._core._current,
                    e = t + this._core.settings.items,
                    i = this._core.settings.lazyLoad,
                    s = this._core.$stage.children().toArray().slice(t, e),
                    n = [],
                    o = 0;
                r.each(s, function (t, e) {
                    n.push(r(e).height());
                }),
                    (o = Math.max.apply(null, n)) <= 1 && i && this._previousHeight && (o = this._previousHeight),
                    (this._previousHeight = o),
                    this._core.$stage.parent().height(o).addClass(this._core.settings.autoHeightClass);
            }),
            (s.prototype.destroy = function () {
                var t, e;
                for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (r.fn.owlCarousel.Constructor.Plugins.AutoHeight = s);
    })(window.Zepto || window.jQuery, window, document),
    (function (c, t, e) {
        var i = function (t) {
            (this._core = t),
                (this._videos = {}),
                (this._playing = null),
                (this._handlers = {
                    "initialized.owl.carousel": c.proxy(function (t) {
                        t.namespace && this._core.register({ type: "state", name: "playing", tags: ["interacting"] });
                    }, this),
                    "resize.owl.carousel": c.proxy(function (t) {
                        t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault();
                    }, this),
                    "refreshed.owl.carousel": c.proxy(function (t) {
                        t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove();
                    }, this),
                    "changed.owl.carousel": c.proxy(function (t) {
                        t.namespace && "position" === t.property.name && this._playing && this.stop();
                    }, this),
                    "prepared.owl.carousel": c.proxy(function (t) {
                        if (t.namespace) {
                            var e = c(t.content).find(".owl-video");
                            e.length && (e.css("display", "none"), this.fetch(e, c(t.content)));
                        }
                    }, this),
                }),
                (this._core.options = c.extend({}, i.Defaults, this._core.options)),
                this._core.$element.on(this._handlers),
                this._core.$element.on(
                    "click.owl.video",
                    ".owl-video-play-icon",
                    c.proxy(function (t) {
                        this.play(t);
                    }, this)
                );
        };
        (i.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
            (i.prototype.fetch = function (t, e) {
                var i = t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube",
                    s = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"),
                    n = t.attr("data-width") || this._core.settings.videoWidth,
                    o = t.attr("data-height") || this._core.settings.videoHeight,
                    r = t.attr("href");
                if (!r) throw new Error("Missing video URL.");
                if (
                    -1 <
                    (s = r.match(
                        /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
                    ))[3].indexOf("youtu")
                )
                    i = "youtube";
                else if (-1 < s[3].indexOf("vimeo")) i = "vimeo";
                else {
                    if (!(-1 < s[3].indexOf("vzaar"))) throw new Error("Video URL not supported.");
                    i = "vzaar";
                }
                (s = s[6]), (this._videos[r] = { type: i, id: s, width: n, height: o }), e.attr("data-video", r), this.thumbnail(t, this._videos[r]);
            }),
            (i.prototype.thumbnail = function (e, t) {
                function i(t) {
                    '<div class="owl-video-play-icon"></div>',
                        (s = l.lazyLoad ? c("<div/>", { class: "owl-video-tn " + h, srcType: t }) : c("<div/>", { class: "owl-video-tn", style: "opacity:1;background-image:url(" + t + ")" })),
                        e.after(s),
                        e.after('<div class="owl-video-play-icon"></div>');
                }
                var s,
                    n,
                    o = t.width && t.height ? "width:" + t.width + "px;height:" + t.height + "px;" : "",
                    r = e.find("img"),
                    a = "src",
                    h = "",
                    l = this._core.settings;
                if ((e.wrap(c("<div/>", { class: "owl-video-wrapper", style: o })), this._core.settings.lazyLoad && ((a = "data-src"), (h = "owl-lazy")), r.length)) return i(r.attr(a)), r.remove(), !1;
                "youtube" === t.type
                    ? ((n = "//img.youtube.com/vi/" + t.id + "/hqdefault.jpg"), i(n))
                    : "vimeo" === t.type
                    ? c.ajax({
                          type: "GET",
                          url: "//vimeo.com/api/v2/video/" + t.id + ".json",
                          jsonp: "callback",
                          dataType: "jsonp",
                          success: function (t) {
                              (n = t[0].thumbnail_large), i(n);
                          },
                      })
                    : "vzaar" === t.type &&
                      c.ajax({
                          type: "GET",
                          url: "//vzaar.com/api/videos/" + t.id + ".json",
                          jsonp: "callback",
                          dataType: "jsonp",
                          success: function (t) {
                              (n = t.framegrab_url), i(n);
                          },
                      });
            }),
            (i.prototype.stop = function () {
                this._core.trigger("stop", null, "video"),
                    this._playing.find(".owl-video-frame").remove(),
                    this._playing.removeClass("owl-video-playing"),
                    (this._playing = null),
                    this._core.leave("playing"),
                    this._core.trigger("stopped", null, "video");
            }),
            (i.prototype.play = function (t) {
                var e,
                    i = c(t.target).closest("." + this._core.settings.itemClass),
                    s = this._videos[i.attr("data-video")],
                    n = s.width || "100%",
                    o = s.height || this._core.$stage.height();
                this._playing ||
                    (this._core.enter("playing"),
                    this._core.trigger("play", null, "video"),
                    (i = this._core.items(this._core.relative(i.index()))),
                    this._core.reset(i.index()),
                    (e = c('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>')).attr("height", o),
                    e.attr("width", n),
                    "youtube" === s.type
                        ? e.attr("src", "//www.youtube.com/embed/" + s.id + "?autoplay=1&rel=0&v=" + s.id)
                        : "vimeo" === s.type
                        ? e.attr("src", "//player.vimeo.com/video/" + s.id + "?autoplay=1")
                        : "vzaar" === s.type && e.attr("src", "//view.vzaar.com/" + s.id + "/player?autoplay=true"),
                    c(e).wrap('<div class="owl-video-frame" />').insertAfter(i.find(".owl-video")),
                    (this._playing = i.addClass("owl-video-playing")));
            }),
            (i.prototype.isInFullScreen = function () {
                var t = e.fullscreenElement || e.mozFullScreenElement || e.webkitFullscreenElement;
                return t && c(t).parent().hasClass("owl-video-frame");
            }),
            (i.prototype.destroy = function () {
                var t, e;
                for (t in (this._core.$element.off("click.owl.video"), this._handlers)) this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (c.fn.owlCarousel.Constructor.Plugins.Video = i);
    })(window.Zepto || window.jQuery, window, document),
    (function (r) {
        var e = function (t) {
            (this.core = t),
                (this.core.options = r.extend({}, e.Defaults, this.core.options)),
                (this.swapping = !0),
                (this.previous = void 0),
                (this.next = void 0),
                (this.handlers = {
                    "change.owl.carousel": r.proxy(function (t) {
                        t.namespace && "position" == t.property.name && ((this.previous = this.core.current()), (this.next = t.property.value));
                    }, this),
                    "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": r.proxy(function (t) {
                        t.namespace && (this.swapping = "translated" == t.type);
                    }, this),
                    "translate.owl.carousel": r.proxy(function (t) {
                        t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap();
                    }, this),
                }),
                this.core.$element.on(this.handlers);
        };
        (e.Defaults = { animateOut: !1, animateIn: !1 }),
            (e.prototype.swap = function () {
                if (1 === this.core.settings.items && r.support.animation && r.support.transition) {
                    this.core.speed(0);
                    var t,
                        e = r.proxy(this.clear, this),
                        i = this.core.$stage.children().eq(this.previous),
                        s = this.core.$stage.children().eq(this.next),
                        n = this.core.settings.animateIn,
                        o = this.core.settings.animateOut;
                    this.core.current() !== this.previous &&
                        (o &&
                            ((t = this.core.coordinates(this.previous) - this.core.coordinates(this.next)),
                            i
                                .one(r.support.animation.end, e)
                                .css({ left: t + "px" })
                                .addClass("animated owl-animated-out")
                                .addClass(o)),
                        n && s.one(r.support.animation.end, e).addClass("animated owl-animated-in").addClass(n));
                }
            }),
            (e.prototype.clear = function (t) {
                r(t.target).css({ left: "" }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd();
            }),
            (e.prototype.destroy = function () {
                var t, e;
                for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (r.fn.owlCarousel.Constructor.Plugins.Animate = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (s, n, e) {
        var i = function (t) {
            (this._core = t),
                (this._call = null),
                (this._time = 0),
                (this._timeout = 0),
                (this._paused = !0),
                (this._handlers = {
                    "changed.owl.carousel": s.proxy(function (t) {
                        t.namespace && "settings" === t.property.name ? (this._core.settings.autoplay ? this.play() : this.stop()) : t.namespace && "position" === t.property.name && this._paused && (this._time = 0);
                    }, this),
                    "initialized.owl.carousel": s.proxy(function (t) {
                        t.namespace && this._core.settings.autoplay && this.play();
                    }, this),
                    "play.owl.autoplay": s.proxy(function (t, e, i) {
                        t.namespace && this.play(e, i);
                    }, this),
                    "stop.owl.autoplay": s.proxy(function (t) {
                        t.namespace && this.stop();
                    }, this),
                    "mouseover.owl.autoplay": s.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
                    }, this),
                    "mouseleave.owl.autoplay": s.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play();
                    }, this),
                    "touchstart.owl.core": s.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
                    }, this),
                    "touchend.owl.core": s.proxy(function () {
                        this._core.settings.autoplayHoverPause && this.play();
                    }, this),
                }),
                this._core.$element.on(this._handlers),
                (this._core.options = s.extend({}, i.Defaults, this._core.options));
        };
        (i.Defaults = { autoplay: !1, autoplayTimeout: 5e3, autoplayHoverPause: !1, autoplaySpeed: !1 }),
            (i.prototype._next = function (t) {
                (this._call = n.setTimeout(s.proxy(this._next, this, t), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read())),
                    this._core.is("interacting") || e.hidden || this._core.next(t || this._core.settings.autoplaySpeed);
            }),
            (i.prototype.read = function () {
                return new Date().getTime() - this._time;
            }),
            (i.prototype.play = function (t, e) {
                var i;
                this._core.is("rotating") || this._core.enter("rotating"),
                    (t = t || this._core.settings.autoplayTimeout),
                    (i = Math.min(this._time % (this._timeout || t), t)),
                    this._paused ? ((this._time = this.read()), (this._paused = !1)) : n.clearTimeout(this._call),
                    (this._time += (this.read() % t) - i),
                    (this._timeout = t),
                    (this._call = n.setTimeout(s.proxy(this._next, this, e), t - i));
            }),
            (i.prototype.stop = function () {
                this._core.is("rotating") && ((this._time = 0), (this._paused = !0), n.clearTimeout(this._call), this._core.leave("rotating"));
            }),
            (i.prototype.pause = function () {
                this._core.is("rotating") && !this._paused && ((this._time = this.read()), (this._paused = !0), n.clearTimeout(this._call));
            }),
            (i.prototype.destroy = function () {
                var t, e;
                for (t in (this.stop(), this._handlers)) this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (s.fn.owlCarousel.Constructor.Plugins.autoplay = i);
    })(window.Zepto || window.jQuery, window, document),
    (function (o) {
        "use strict";
        var e = function (t) {
            (this._core = t),
                (this._initialized = !1),
                (this._pages = []),
                (this._controls = {}),
                (this._templates = []),
                (this.$element = this._core.$element),
                (this._overrides = { next: this._core.next, prev: this._core.prev, to: this._core.to }),
                (this._handlers = {
                    "prepared.owl.carousel": o.proxy(function (t) {
                        t.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + o(t.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>");
                    }, this),
                    "added.owl.carousel": o.proxy(function (t) {
                        t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop());
                    }, this),
                    "remove.owl.carousel": o.proxy(function (t) {
                        t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1);
                    }, this),
                    "changed.owl.carousel": o.proxy(function (t) {
                        t.namespace && "position" == t.property.name && this.draw();
                    }, this),
                    "initialized.owl.carousel": o.proxy(function (t) {
                        t.namespace &&
                            !this._initialized &&
                            (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), (this._initialized = !0), this._core.trigger("initialized", null, "navigation"));
                    }, this),
                    "refreshed.owl.carousel": o.proxy(function (t) {
                        t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"));
                    }, this),
                }),
                (this._core.options = o.extend({}, e.Defaults, this._core.options)),
                this.$element.on(this._handlers);
        };
        (e.Defaults = {
            nav: !1,
            navText: ['<span aria-label="Previous">&#x2039;</span>', '<span aria-label="Next">&#x203a;</span>'],
            navSpeed: !1,
            navElement: 'button type="button" role="presentation"',
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: ["owl-prev", "owl-next"],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotsData: !1,
            dotsSpeed: !1,
            dotsContainer: !1,
        }),
            (e.prototype.initialize = function () {
                var t,
                    i = this._core.settings;
                for (t in ((this._controls.$relative = (i.navContainer ? o(i.navContainer) : o("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled")),
                (this._controls.$previous = o("<" + i.navElement + ">")
                    .addClass(i.navClass[0])
                    .html(i.navText[0])
                    .prependTo(this._controls.$relative)
                    .on(
                        "click",
                        o.proxy(function (t) {
                            this.prev(i.navSpeed);
                        }, this)
                    )),
                (this._controls.$next = o("<" + i.navElement + ">")
                    .addClass(i.navClass[1])
                    .html(i.navText[1])
                    .appendTo(this._controls.$relative)
                    .on(
                        "click",
                        o.proxy(function (t) {
                            this.next(i.navSpeed);
                        }, this)
                    )),
                i.dotsData || (this._templates = [o('<button role="button">').addClass(i.dotClass).append(o("<span>")).prop("outerHTML")]),
                (this._controls.$absolute = (i.dotsContainer ? o(i.dotsContainer) : o("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled")),
                this._controls.$absolute.on(
                    "click",
                    "button",
                    o.proxy(function (t) {
                        var e = o(t.target).parent().is(this._controls.$absolute) ? o(t.target).index() : o(t.target).parent().index();
                        t.preventDefault(), this.to(e, i.dotsSpeed);
                    }, this)
                ),
                this._overrides))
                    this._core[t] = o.proxy(this[t], this);
            }),
            (e.prototype.destroy = function () {
                var t, e, i, s, n;
                for (t in ((n = this._core.settings), this._handlers)) this.$element.off(t, this._handlers[t]);
                for (e in this._controls) "$relative" === e && n.navContainer ? this._controls[e].html("") : this._controls[e].remove();
                for (s in this.overides) this._core[s] = this._overrides[s];
                for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null);
            }),
            (e.prototype.update = function () {
                var t,
                    e,
                    i = this._core.clones().length / 2,
                    s = i + this._core.items().length,
                    n = this._core.maximum(!0),
                    o = this._core.settings,
                    r = o.center || o.autoWidth || o.dotsData ? 1 : o.dotsEach || o.items;
                if (("page" !== o.slideBy && (o.slideBy = Math.min(o.slideBy, o.items)), o.dots || "page" == o.slideBy))
                    for (this._pages = [], t = i, e = 0; t < s; t++) {
                        if (r <= e || 0 === e) {
                            if ((this._pages.push({ start: Math.min(n, t - i), end: t - i + r - 1 }), Math.min(n, t - i) === n)) break;
                            (e = 0), 0;
                        }
                        e += this._core.mergers(this._core.relative(t));
                    }
            }),
            (e.prototype.draw = function () {
                var t,
                    e = this._core.settings,
                    i = this._core.items().length <= e.items,
                    s = this._core.relative(this._core.current()),
                    n = e.loop || e.rewind;
                this._controls.$relative.toggleClass("disabled", !e.nav || i),
                    e.nav && (this._controls.$previous.toggleClass("disabled", !n && s <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !n && s >= this._core.maximum(!0))),
                    this._controls.$absolute.toggleClass("disabled", !e.dots || i),
                    e.dots &&
                        ((t = this._pages.length - this._controls.$absolute.children().length),
                        e.dotsData && 0 != t
                            ? this._controls.$absolute.html(this._templates.join(""))
                            : 0 < t
                            ? this._controls.$absolute.append(new Array(1 + t).join(this._templates[0]))
                            : t < 0 && this._controls.$absolute.children().slice(t).remove(),
                        this._controls.$absolute.find(".active").removeClass("active"),
                        this._controls.$absolute.children().eq(o.inArray(this.current(), this._pages)).addClass("active"));
            }),
            (e.prototype.onTrigger = function (t) {
                var e = this._core.settings;
                t.page = { index: o.inArray(this.current(), this._pages), count: this._pages.length, size: e && (e.center || e.autoWidth || e.dotsData ? 1 : e.dotsEach || e.items) };
            }),
            (e.prototype.current = function () {
                var i = this._core.relative(this._core.current());
                return o
                    .grep(
                        this._pages,
                        o.proxy(function (t, e) {
                            return t.start <= i && t.end >= i;
                        }, this)
                    )
                    .pop();
            }),
            (e.prototype.getPosition = function (t) {
                var e,
                    i,
                    s = this._core.settings;
                return (
                    "page" == s.slideBy
                        ? ((e = o.inArray(this.current(), this._pages)), (i = this._pages.length), t ? ++e : --e, (e = this._pages[((e % i) + i) % i].start))
                        : ((e = this._core.relative(this._core.current())), (i = this._core.items().length), t ? (e += s.slideBy) : (e -= s.slideBy)),
                    e
                );
            }),
            (e.prototype.next = function (t) {
                o.proxy(this._overrides.to, this._core)(this.getPosition(!0), t);
            }),
            (e.prototype.prev = function (t) {
                o.proxy(this._overrides.to, this._core)(this.getPosition(!1), t);
            }),
            (e.prototype.to = function (t, e, i) {
                var s;
                !i && this._pages.length ? ((s = this._pages.length), o.proxy(this._overrides.to, this._core)(this._pages[((t % s) + s) % s].start, e)) : o.proxy(this._overrides.to, this._core)(t, e);
            }),
            (o.fn.owlCarousel.Constructor.Plugins.Navigation = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (s, n) {
        "use strict";
        var e = function (t) {
            (this._core = t),
                (this._hashes = {}),
                (this.$element = this._core.$element),
                (this._handlers = {
                    "initialized.owl.carousel": s.proxy(function (t) {
                        t.namespace && "URLHash" === this._core.settings.startPosition && s(n).trigger("hashchange.owl.navigation");
                    }, this),
                    "prepared.owl.carousel": s.proxy(function (t) {
                        if (t.namespace) {
                            var e = s(t.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                            if (!e) return;
                            this._hashes[e] = t.content;
                        }
                    }, this),
                    "changed.owl.carousel": s.proxy(function (t) {
                        if (t.namespace && "position" === t.property.name) {
                            var i = this._core.items(this._core.relative(this._core.current())),
                                e = s
                                    .map(this._hashes, function (t, e) {
                                        return t === i ? e : null;
                                    })
                                    .join();
                            if (!e || n.location.hash.slice(1) === e) return;
                            n.location.hash = e;
                        }
                    }, this),
                }),
                (this._core.options = s.extend({}, e.Defaults, this._core.options)),
                this.$element.on(this._handlers),
                s(n).on(
                    "hashchange.owl.navigation",
                    s.proxy(function (t) {
                        var e = n.location.hash.substring(1),
                            i = this._core.$stage.children(),
                            s = this._hashes[e] && i.index(this._hashes[e]);
                        void 0 !== s && s !== this._core.current() && this._core.to(this._core.relative(s), !1, !0);
                    }, this)
                );
        };
        (e.Defaults = { URLhashListener: !1 }),
            (e.prototype.destroy = function () {
                var t, e;
                for (t in (s(n).off("hashchange.owl.navigation"), this._handlers)) this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (s.fn.owlCarousel.Constructor.Plugins.Hash = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (n, t, e, o) {
        var r = n("<support>").get(0).style,
            a = "Webkit Moz O ms".split(" "),
            i = {
                transition: { end: { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd", transition: "transitionend" } },
                animation: { end: { WebkitAnimation: "webkitAnimationEnd", MozAnimation: "animationend", OAnimation: "oAnimationEnd", animation: "animationend" } },
            },
            s = function () {
                return !!c("transform");
            },
            h = function () {
                return !!c("perspective");
            },
            l = function () {
                return !!c("animation");
            };
        function c(t, i) {
            var s = !1,
                e = t.charAt(0).toUpperCase() + t.slice(1);
            return (
                n.each((t + " " + a.join(e + " ") + e).split(" "), function (t, e) {
                    if (r[e] !== o) return (s = !i || e), !1;
                }),
                s
            );
        }
        function p(t) {
            return c(t, !0);
        }
        !(function () {
            return !!c("transition");
        })() || ((n.support.transition = new String(p("transition"))), (n.support.transition.end = i.transition.end[n.support.transition])),
            l() && ((n.support.animation = new String(p("animation"))), (n.support.animation.end = i.animation.end[n.support.animation])),
            s() && ((n.support.transform = new String(p("transform"))), (n.support.transform3d = h()));
    })(window.Zepto || window.jQuery, window, document);
/*! Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
!(function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto);
})(function (a) {
    var b,
        c,
        d,
        e,
        f,
        g,
        h = "Close",
        i = "BeforeClose",
        j = "AfterClose",
        k = "BeforeAppend",
        l = "MarkupParse",
        m = "Open",
        n = "Change",
        o = "mfp",
        p = "." + o,
        q = "mfp-ready",
        r = "mfp-removing",
        s = "mfp-prevent-close",
        t = function () {},
        u = !!window.jQuery,
        v = a(window),
        w = function (a, c) {
            b.ev.on(o + a + p, c);
        },
        x = function (b, c, d, e) {
            var f = document.createElement("div");
            return (f.className = "mfp-" + b), d && (f.innerHTML = d), e ? c && c.appendChild(f) : ((f = a(f)), c && f.appendTo(c)), f;
        },
        y = function (c, d) {
            b.ev.triggerHandler(o + c, d), b.st.callbacks && ((c = c.charAt(0).toLowerCase() + c.slice(1)), b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]));
        },
        z = function (c) {
            return (c === g && b.currTemplate.closeBtn) || ((b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose))), (g = c)), b.currTemplate.closeBtn;
        },
        A = function () {
            a.magnificPopup.instance || ((b = new t()), b.init(), (a.magnificPopup.instance = b));
        },
        B = function () {
            var a = document.createElement("p").style,
                b = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== a.transition) return !0;
            for (; b.length; ) if (b.pop() + "Transition" in a) return !0;
            return !1;
        };
    (t.prototype = {
        constructor: t,
        init: function () {
            var c = navigator.appVersion;
            (b.isLowIE = b.isIE8 = document.all && !document.addEventListener),
                (b.isAndroid = /android/gi.test(c)),
                (b.isIOS = /iphone|ipad|ipod/gi.test(c)),
                (b.supportsTransition = B()),
                (b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent)),
                (d = a(document)),
                (b.popupsCache = {});
        },
        open: function (c) {
            var e;
            if (c.isObj === !1) {
                (b.items = c.items.toArray()), (b.index = 0);
                var g,
                    h = c.items;
                for (e = 0; e < h.length; e++)
                    if (((g = h[e]), g.parsed && (g = g.el[0]), g === c.el[0])) {
                        b.index = e;
                        break;
                    }
            } else (b.items = a.isArray(c.items) ? c.items : [c.items]), (b.index = c.index || 0);
            if (b.isOpen) return void b.updateItemHTML();
            (b.types = []),
                (f = ""),
                c.mainEl && c.mainEl.length ? (b.ev = c.mainEl.eq(0)) : (b.ev = d),
                c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), (b.currTemplate = b.popupsCache[c.key])) : (b.currTemplate = {}),
                (b.st = a.extend(!0, {}, a.magnificPopup.defaults, c)),
                (b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos),
                b.st.modal && ((b.st.closeOnContentClick = !1), (b.st.closeOnBgClick = !1), (b.st.showCloseBtn = !1), (b.st.enableEscapeKey = !1)),
                b.bgOverlay ||
                    ((b.bgOverlay = x("bg").on("click" + p, function () {
                        b.close();
                    })),
                    (b.wrap = x("wrap")
                        .attr("tabindex", -1)
                        .on("click" + p, function (a) {
                            b._checkIfClose(a.target) && b.close();
                        })),
                    (b.container = x("container", b.wrap))),
                (b.contentContainer = x("content")),
                b.st.preloader && (b.preloader = x("preloader", b.container, b.st.tLoading));
            var i = a.magnificPopup.modules;
            for (e = 0; e < i.length; e++) {
                var j = i[e];
                (j = j.charAt(0).toUpperCase() + j.slice(1)), b["init" + j].call(b);
            }
            y("BeforeOpen"),
                b.st.showCloseBtn &&
                    (b.st.closeBtnInside
                        ? (w(l, function (a, b, c, d) {
                              c.close_replaceWith = z(d.type);
                          }),
                          (f += " mfp-close-btn-in"))
                        : b.wrap.append(z())),
                b.st.alignTop && (f += " mfp-align-top"),
                b.fixedContentPos ? b.wrap.css({ overflow: b.st.overflowY, overflowX: "hidden", overflowY: b.st.overflowY }) : b.wrap.css({ top: v.scrollTop(), position: "absolute" }),
                (b.st.fixedBgPos === !1 || ("auto" === b.st.fixedBgPos && !b.fixedContentPos)) && b.bgOverlay.css({ height: d.height(), position: "absolute" }),
                b.st.enableEscapeKey &&
                    d.on("keyup" + p, function (a) {
                        27 === a.keyCode && b.close();
                    }),
                v.on("resize" + p, function () {
                    b.updateSize();
                }),
                b.st.closeOnContentClick || (f += " mfp-auto-cursor"),
                f && b.wrap.addClass(f);
            var k = (b.wH = v.height()),
                n = {};
            if (b.fixedContentPos && b._hasScrollBar(k)) {
                var o = b._getScrollbarSize();
                o && (n.marginRight = o);
            }
            b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : (n.overflow = "hidden"));
            var r = b.st.mainClass;
            return (
                b.isIE7 && (r += " mfp-ie7"),
                r && b._addClassToMFP(r),
                b.updateItemHTML(),
                y("BuildControls"),
                a("html").css(n),
                b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)),
                (b._lastFocusedEl = document.activeElement),
                setTimeout(function () {
                    b.content ? (b._addClassToMFP(q), b._setFocus()) : b.bgOverlay.addClass(q), d.on("focusin" + p, b._onFocusIn);
                }, 16),
                (b.isOpen = !0),
                b.updateSize(k),
                y(m),
                c
            );
        },
        close: function () {
            b.isOpen &&
                (y(i),
                (b.isOpen = !1),
                b.st.removalDelay && !b.isLowIE && b.supportsTransition
                    ? (b._addClassToMFP(r),
                      setTimeout(function () {
                          b._close();
                      }, b.st.removalDelay))
                    : b._close());
        },
        _close: function () {
            y(h);
            var c = r + " " + q + " ";
            if ((b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos)) {
                var e = { marginRight: "" };
                b.isIE7 ? a("body, html").css("overflow", "") : (e.overflow = ""), a("html").css(e);
            }
            d.off("keyup" + p + " focusin" + p),
                b.ev.off(p),
                b.wrap.attr("class", "mfp-wrap").removeAttr("style"),
                b.bgOverlay.attr("class", "mfp-bg"),
                b.container.attr("class", "mfp-container"),
                !b.st.showCloseBtn || (b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0) || (b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach()),
                b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(),
                (b.currItem = null),
                (b.content = null),
                (b.currTemplate = null),
                (b.prevHeight = 0),
                y(j);
        },
        updateSize: function (a) {
            if (b.isIOS) {
                var c = document.documentElement.clientWidth / window.innerWidth,
                    d = window.innerHeight * c;
                b.wrap.css("height", d), (b.wH = d);
            } else b.wH = a || v.height();
            b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize");
        },
        updateItemHTML: function () {
            var c = b.items[b.index];
            b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index));
            var d = c.type;
            if ((y("BeforeChange", [b.currItem ? b.currItem.type : "", d]), (b.currItem = c), !b.currTemplate[d])) {
                var f = b.st[d] ? b.st[d].markup : !1;
                y("FirstMarkupParse", f), f ? (b.currTemplate[d] = a(f)) : (b.currTemplate[d] = !0);
            }
            e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
            var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
            b.appendContent(g, d), (c.preloaded = !0), y(n, c), (e = c.type), b.container.prepend(b.contentContainer), y("AfterChange");
        },
        appendContent: function (a, c) {
            (b.content = a),
                a ? (b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(z()) : (b.content = a)) : (b.content = ""),
                y(k),
                b.container.addClass("mfp-" + c + "-holder"),
                b.contentContainer.append(b.content);
        },
        parseEl: function (c) {
            var d,
                e = b.items[c];
            if ((e.tagName ? (e = { el: a(e) }) : ((d = e.type), (e = { data: e, src: e.src })), e.el)) {
                for (var f = b.types, g = 0; g < f.length; g++)
                    if (e.el.hasClass("mfp-" + f[g])) {
                        d = f[g];
                        break;
                    }
                (e.src = e.el.attr("data-mfp-src")), e.src || (e.src = e.el.attr("href"));
            }
            return (e.type = d || b.st.type || "inline"), (e.index = c), (e.parsed = !0), (b.items[c] = e), y("ElementParse", e), b.items[c];
        },
        addGroup: function (a, c) {
            var d = function (d) {
                (d.mfpEl = this), b._openClick(d, a, c);
            };
            c || (c = {});
            var e = "click.magnificPopup";
            (c.mainEl = a), c.items ? ((c.isObj = !0), a.off(e).on(e, d)) : ((c.isObj = !1), c.delegate ? a.off(e).on(e, c.delegate, d) : ((c.items = a), a.off(e).on(e, d)));
        },
        _openClick: function (c, d, e) {
            var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
            if (f || !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)) {
                var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
                if (g)
                    if (a.isFunction(g)) {
                        if (!g.call(b)) return !0;
                    } else if (v.width() < g) return !0;
                c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), (e.el = a(c.mfpEl)), e.delegate && (e.items = d.find(e.delegate)), b.open(e);
            }
        },
        updateStatus: function (a, d) {
            if (b.preloader) {
                c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading);
                var e = { status: a, text: d };
                y("UpdateStatus", e),
                    (a = e.status),
                    (d = e.text),
                    b.preloader.html(d),
                    b.preloader.find("a").on("click", function (a) {
                        a.stopImmediatePropagation();
                    }),
                    b.container.addClass("mfp-s-" + a),
                    (c = a);
            }
        },
        _checkIfClose: function (c) {
            if (!a(c).hasClass(s)) {
                var d = b.st.closeOnContentClick,
                    e = b.st.closeOnBgClick;
                if (d && e) return !0;
                if (!b.content || a(c).hasClass("mfp-close") || (b.preloader && c === b.preloader[0])) return !0;
                if (c === b.content[0] || a.contains(b.content[0], c)) {
                    if (d) return !0;
                } else if (e && a.contains(document, c)) return !0;
                return !1;
            }
        },
        _addClassToMFP: function (a) {
            b.bgOverlay.addClass(a), b.wrap.addClass(a);
        },
        _removeClassFromMFP: function (a) {
            this.bgOverlay.removeClass(a), b.wrap.removeClass(a);
        },
        _hasScrollBar: function (a) {
            return (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height());
        },
        _setFocus: function () {
            (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus();
        },
        _onFocusIn: function (c) {
            return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(), !1);
        },
        _parseMarkup: function (b, c, d) {
            var e;
            d.data && (c = a.extend(d.data, c)),
                y(l, [b, c, d]),
                a.each(c, function (c, d) {
                    if (void 0 === d || d === !1) return !0;
                    if (((e = c.split("_")), e.length > 1)) {
                        var f = b.find(p + "-" + e[0]);
                        if (f.length > 0) {
                            var g = e[1];
                            "replaceWith" === g ? f[0] !== d[0] && f.replaceWith(d) : "img" === g ? (f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class")))) : f.attr(e[1], d);
                        }
                    } else b.find(p + "-" + c).html(d);
                });
        },
        _getScrollbarSize: function () {
            if (void 0 === b.scrollbarSize) {
                var a = document.createElement("div");
                (a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"), document.body.appendChild(a), (b.scrollbarSize = a.offsetWidth - a.clientWidth), document.body.removeChild(a);
            }
            return b.scrollbarSize;
        },
    }),
        (a.magnificPopup = {
            instance: null,
            proto: t.prototype,
            modules: [],
            open: function (b, c) {
                return A(), (b = b ? a.extend(!0, {}, b) : {}), (b.isObj = !0), (b.index = c || 0), this.instance.open(b);
            },
            close: function () {
                return a.magnificPopup.instance && a.magnificPopup.instance.close();
            },
            registerModule: function (b, c) {
                c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b);
            },
            defaults: {
                disableOn: 0,
                key: null,
                midClick: !1,
                mainClass: "",
                preloader: !0,
                focus: "",
                closeOnContentClick: !1,
                closeOnBgClick: !0,
                closeBtnInside: !0,
                showCloseBtn: !0,
                enableEscapeKey: !0,
                modal: !1,
                alignTop: !1,
                removalDelay: 0,
                prependTo: null,
                fixedContentPos: "auto",
                fixedBgPos: "auto",
                overflowY: "auto",
                closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
                tClose: "Close (Esc)",
                tLoading: "Loading...",
                autoFocusLast: !0,
            },
        }),
        (a.fn.magnificPopup = function (c) {
            A();
            var d = a(this);
            if ("string" == typeof c)
                if ("open" === c) {
                    var e,
                        f = u ? d.data("magnificPopup") : d[0].magnificPopup,
                        g = parseInt(arguments[1], 10) || 0;
                    f.items ? (e = f.items[g]) : ((e = d), f.delegate && (e = e.find(f.delegate)), (e = e.eq(g))), b._openClick({ mfpEl: e }, d, f);
                } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
            else (c = a.extend(!0, {}, c)), u ? d.data("magnificPopup", c) : (d[0].magnificPopup = c), b.addGroup(d, c);
            return d;
        });
    var C,
        D,
        E,
        F = "inline",
        G = function () {
            E && (D.after(E.addClass(C)).detach(), (E = null));
        };
    a.magnificPopup.registerModule(F, {
        options: { hiddenClass: "hide", markup: "", tNotFound: "Content not found" },
        proto: {
            initInline: function () {
                b.types.push(F),
                    w(h + "." + F, function () {
                        G();
                    });
            },
            getInline: function (c, d) {
                if ((G(), c.src)) {
                    var e = b.st.inline,
                        f = a(c.src);
                    if (f.length) {
                        var g = f[0].parentNode;
                        g && g.tagName && (D || ((C = e.hiddenClass), (D = x(C)), (C = "mfp-" + C)), (E = f.after(D).detach().removeClass(C))), b.updateStatus("ready");
                    } else b.updateStatus("error", e.tNotFound), (f = a("<div>"));
                    return (c.inlineElement = f), f;
                }
                return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d;
            },
        },
    });
    var H,
        I = "ajax",
        J = function () {
            H && a(document.body).removeClass(H);
        },
        K = function () {
            J(), b.req && b.req.abort();
        };
    a.magnificPopup.registerModule(I, {
        options: { settings: null, cursor: "mfp-ajax-cur", tError: '<a href="%url%">The content</a> could not be loaded.' },
        proto: {
            initAjax: function () {
                b.types.push(I), (H = b.st.ajax.cursor), w(h + "." + I, K), w("BeforeChange." + I, K);
            },
            getAjax: function (c) {
                H && a(document.body).addClass(H), b.updateStatus("loading");
                var d = a.extend(
                    {
                        url: c.src,
                        success: function (d, e, f) {
                            var g = { data: d, xhr: f };
                            y("ParseAjax", g),
                                b.appendContent(a(g.data), I),
                                (c.finished = !0),
                                J(),
                                b._setFocus(),
                                setTimeout(function () {
                                    b.wrap.addClass(q);
                                }, 16),
                                b.updateStatus("ready"),
                                y("AjaxContentAdded");
                        },
                        error: function () {
                            J(), (c.finished = c.loadError = !0), b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src));
                        },
                    },
                    b.st.ajax.settings
                );
                return (b.req = a.ajax(d)), "";
            },
        },
    });
    var L,
        M = function (c) {
            if (c.data && void 0 !== c.data.title) return c.data.title;
            var d = b.st.image.titleSrc;
            if (d) {
                if (a.isFunction(d)) return d.call(b, c);
                if (c.el) return c.el.attr(d) || "";
            }
            return "";
        };
    a.magnificPopup.registerModule("image", {
        options: {
            markup:
                '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.',
        },
        proto: {
            initImage: function () {
                var c = b.st.image,
                    d = ".image";
                b.types.push("image"),
                    w(m + d, function () {
                        "image" === b.currItem.type && c.cursor && a(document.body).addClass(c.cursor);
                    }),
                    w(h + d, function () {
                        c.cursor && a(document.body).removeClass(c.cursor), v.off("resize" + p);
                    }),
                    w("Resize" + d, b.resizeImage),
                    b.isLowIE && w("AfterChange", b.resizeImage);
            },
            resizeImage: function () {
                var a = b.currItem;
                if (a && a.img && b.st.image.verticalFit) {
                    var c = 0;
                    b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", b.wH - c);
                }
            },
            _onImageHasSize: function (a) {
                a.img && ((a.hasSize = !0), L && clearInterval(L), (a.isCheckingImgSize = !1), y("ImageHasSize", a), a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), (a.imgHidden = !1)));
            },
            findImageSize: function (a) {
                var c = 0,
                    d = a.img[0],
                    e = function (f) {
                        L && clearInterval(L),
                            (L = setInterval(function () {
                                return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(L), c++, void (3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500)));
                            }, f));
                    };
                e(1);
            },
            getImage: function (c, d) {
                var e = 0,
                    f = function () {
                        c &&
                            (c.img[0].complete
                                ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("ready")), (c.hasSize = !0), (c.loaded = !0), y("ImageLoadComplete"))
                                : (e++, 200 > e ? setTimeout(f, 100) : g()));
                    },
                    g = function () {
                        c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), (c.hasSize = !0), (c.loaded = !0), (c.loadError = !0));
                    },
                    h = b.st.image,
                    i = d.find(".mfp-img");
                if (i.length) {
                    var j = document.createElement("img");
                    (j.className = "mfp-img"),
                        c.el && c.el.find("img").length && (j.alt = c.el.find("img").attr("alt")),
                        (c.img = a(j).on("load.mfploader", f).on("error.mfploader", g)),
                        (j.src = c.src),
                        i.is("img") && (c.img = c.img.clone()),
                        (j = c.img[0]),
                        j.naturalWidth > 0 ? (c.hasSize = !0) : j.width || (c.hasSize = !1);
                }
                return (
                    b._parseMarkup(d, { title: M(c), img_replaceWith: c.img }, c),
                    b.resizeImage(),
                    c.hasSize
                        ? (L && clearInterval(L), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), b.updateStatus("ready")), d)
                        : (b.updateStatus("loading"), (c.loading = !0), c.hasSize || ((c.imgHidden = !0), d.addClass("mfp-loading"), b.findImageSize(c)), d)
                );
            },
        },
    });
    var N,
        O = function () {
            return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), N;
        };
    a.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function (a) {
                return a.is("img") ? a : a.find("img");
            },
        },
        proto: {
            initZoom: function () {
                var a,
                    c = b.st.zoom,
                    d = ".zoom";
                if (c.enabled && b.supportsTransition) {
                    var e,
                        f,
                        g = c.duration,
                        j = function (a) {
                            var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                d = "all " + c.duration / 1e3 + "s " + c.easing,
                                e = { position: "fixed", zIndex: 9999, left: 0, top: 0, "-webkit-backface-visibility": "hidden" },
                                f = "transition";
                            return (e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d), b.css(e), b;
                        },
                        k = function () {
                            b.content.css("visibility", "visible");
                        };
                    w("BuildControls" + d, function () {
                        if (b._allowZoom()) {
                            if ((clearTimeout(e), b.content.css("visibility", "hidden"), (a = b._getItemToZoom()), !a)) return void k();
                            (f = j(a)),
                                f.css(b._getOffset()),
                                b.wrap.append(f),
                                (e = setTimeout(function () {
                                    f.css(b._getOffset(!0)),
                                        (e = setTimeout(function () {
                                            k(),
                                                setTimeout(function () {
                                                    f.remove(), (a = f = null), y("ZoomAnimationEnded");
                                                }, 16);
                                        }, g));
                                }, 16));
                        }
                    }),
                        w(i + d, function () {
                            if (b._allowZoom()) {
                                if ((clearTimeout(e), (b.st.removalDelay = g), !a)) {
                                    if (((a = b._getItemToZoom()), !a)) return;
                                    f = j(a);
                                }
                                f.css(b._getOffset(!0)),
                                    b.wrap.append(f),
                                    b.content.css("visibility", "hidden"),
                                    setTimeout(function () {
                                        f.css(b._getOffset());
                                    }, 16);
                            }
                        }),
                        w(h + d, function () {
                            b._allowZoom() && (k(), f && f.remove(), (a = null));
                        });
                }
            },
            _allowZoom: function () {
                return "image" === b.currItem.type;
            },
            _getItemToZoom: function () {
                return b.currItem.hasSize ? b.currItem.img : !1;
            },
            _getOffset: function (c) {
                var d;
                d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
                var e = d.offset(),
                    f = parseInt(d.css("padding-top"), 10),
                    g = parseInt(d.css("padding-bottom"), 10);
                e.top -= a(window).scrollTop() - f;
                var h = { width: d.width(), height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f };
                return O() ? (h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)") : ((h.left = e.left), (h.top = e.top)), h;
            },
        },
    });
    var P = "iframe",
        Q = "//about:blank",
        R = function (a) {
            if (b.currTemplate[P]) {
                var c = b.currTemplate[P].find("iframe");
                c.length && (a || (c[0].src = Q), b.isIE8 && c.css("display", a ? "block" : "none"));
            }
        };
    a.magnificPopup.registerModule(P, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: { index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1" },
                vimeo: { index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1" },
                gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
            },
        },
        proto: {
            initIframe: function () {
                b.types.push(P),
                    w("BeforeChange", function (a, b, c) {
                        b !== c && (b === P ? R() : c === P && R(!0));
                    }),
                    w(h + "." + P, function () {
                        R();
                    });
            },
            getIframe: function (c, d) {
                var e = c.src,
                    f = b.st.iframe;
                a.each(f.patterns, function () {
                    return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), (e = this.src.replace("%id%", e)), !1) : void 0;
                });
                var g = {};
                return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d;
            },
        },
    });
    var S = function (a) {
            var c = b.items.length;
            return a > c - 1 ? a - c : 0 > a ? c + a : a;
        },
        T = function (a, b, c) {
            return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
        };
    a.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%",
        },
        proto: {
            initGallery: function () {
                var c = b.st.gallery,
                    e = ".mfp-gallery";
                return (
                    (b.direction = !0),
                    c && c.enabled
                        ? ((f += " mfp-gallery"),
                          w(m + e, function () {
                              c.navigateByImgClick &&
                                  b.wrap.on("click" + e, ".mfp-img", function () {
                                      return b.items.length > 1 ? (b.next(), !1) : void 0;
                                  }),
                                  d.on("keydown" + e, function (a) {
                                      37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next();
                                  });
                          }),
                          w("UpdateStatus" + e, function (a, c) {
                              c.text && (c.text = T(c.text, b.currItem.index, b.items.length));
                          }),
                          w(l + e, function (a, d, e, f) {
                              var g = b.items.length;
                              e.counter = g > 1 ? T(c.tCounter, f.index, g) : "";
                          }),
                          w("BuildControls" + e, function () {
                              if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                                  var d = c.arrowMarkup,
                                      e = (b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(s)),
                                      f = (b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(s));
                                  e.click(function () {
                                      b.prev();
                                  }),
                                      f.click(function () {
                                          b.next();
                                      }),
                                      b.container.append(e.add(f));
                              }
                          }),
                          w(n + e, function () {
                              b._preloadTimeout && clearTimeout(b._preloadTimeout),
                                  (b._preloadTimeout = setTimeout(function () {
                                      b.preloadNearbyImages(), (b._preloadTimeout = null);
                                  }, 16));
                          }),
                          void w(h + e, function () {
                              d.off(e), b.wrap.off("click" + e), (b.arrowRight = b.arrowLeft = null);
                          }))
                        : !1
                );
            },
            next: function () {
                (b.direction = !0), (b.index = S(b.index + 1)), b.updateItemHTML();
            },
            prev: function () {
                (b.direction = !1), (b.index = S(b.index - 1)), b.updateItemHTML();
            },
            goTo: function (a) {
                (b.direction = a >= b.index), (b.index = a), b.updateItemHTML();
            },
            preloadNearbyImages: function () {
                var a,
                    c = b.st.gallery.preload,
                    d = Math.min(c[0], b.items.length),
                    e = Math.min(c[1], b.items.length);
                for (a = 1; a <= (b.direction ? e : d); a++) b._preloadItem(b.index + a);
                for (a = 1; a <= (b.direction ? d : e); a++) b._preloadItem(b.index - a);
            },
            _preloadItem: function (c) {
                if (((c = S(c)), !b.items[c].preloaded)) {
                    var d = b.items[c];
                    d.parsed || (d = b.parseEl(c)),
                        y("LazyLoad", d),
                        "image" === d.type &&
                            (d.img = a('<img class="mfp-img" />')
                                .on("load.mfploader", function () {
                                    d.hasSize = !0;
                                })
                                .on("error.mfploader", function () {
                                    (d.hasSize = !0), (d.loadError = !0), y("LazyLoadError", d);
                                })
                                .attr("src", d.src)),
                        (d.preloaded = !0);
                }
            },
        },
    });
    var U = "retina";
    a.magnificPopup.registerModule(U, {
        options: {
            replaceSrc: function (a) {
                return a.src.replace(/\.\w+$/, function (a) {
                    return "@2x" + a;
                });
            },
            ratio: 1,
        },
        proto: {
            initRetina: function () {
                if (window.devicePixelRatio > 1) {
                    var a = b.st.retina,
                        c = a.ratio;
                    (c = isNaN(c) ? c() : c),
                        c > 1 &&
                            (w("ImageHasSize." + U, function (a, b) {
                                b.img.css({ "max-width": b.img[0].naturalWidth / c, width: "100%" });
                            }),
                            w("ElementParse." + U, function (b, d) {
                                d.src = a.replaceSrc(d, c);
                            }));
                }
            },
        },
    }),
        A();
});

/*! tooltipster v4.2.5 */
!(function (a, b) {
    "function" == typeof define && define.amd
        ? define(["jquery"], function (a) {
              return b(a);
          })
        : "object" == typeof exports
        ? (module.exports = b(require("jquery")))
        : b(jQuery);
})(this, function (a) {
    function b(a) {
        this.$container, (this.constraints = null), this.__$tooltip, this.__init(a);
    }
    function c(b, c) {
        var d = !0;
        return (
            a.each(b, function (a, e) {
                return void 0 === c[a] || b[a] !== c[a] ? ((d = !1), !1) : void 0;
            }),
            d
        );
    }
    function d(b) {
        var c = b.attr("id"),
            d = c ? h.window.document.getElementById(c) : null;
        return d ? d === b[0] : a.contains(h.window.document.body, b[0]);
    }
    function e() {
        if (!g) return !1;
        var a = g.document.body || g.document.documentElement,
            b = a.style,
            c = "transition",
            d = ["Moz", "Webkit", "Khtml", "O", "ms"];
        if ("string" == typeof b[c]) return !0;
        c = c.charAt(0).toUpperCase() + c.substr(1);
        for (var e = 0; e < d.length; e++) if ("string" == typeof b[d[e] + c]) return !0;
        return !1;
    }
    var f = {
            animation: "fade",
            animationDuration: 350,
            content: null,
            contentAsHTML: !1,
            contentCloning: !1,
            debug: !0,
            delay: 300,
            delayTouch: [300, 500],
            functionInit: null,
            functionBefore: null,
            functionReady: null,
            functionAfter: null,
            functionFormat: null,
            IEmin: 6,
            interactive: !1,
            multiple: !1,
            parent: null,
            plugins: ["sideTip"],
            repositionOnScroll: !1,
            restoration: "none",
            selfDestruction: !0,
            theme: [],
            timer: 0,
            trackerInterval: 500,
            trackOrigin: !1,
            trackTooltip: !1,
            trigger: "hover",
            triggerClose: { click: !1, mouseleave: !1, originClick: !1, scroll: !1, tap: !1, touchleave: !1 },
            triggerOpen: { click: !1, mouseenter: !1, tap: !1, touchstart: !1 },
            updateAnimation: "rotate",
            zIndex: 9999999,
        },
        g = "undefined" != typeof window ? window : null,
        h = { hasTouchCapability: !(!g || !("ontouchstart" in g || (g.DocumentTouch && g.document instanceof g.DocumentTouch) || g.navigator.maxTouchPoints)), hasTransitions: e(), IE: !1, semVer: "4.2.5", window: g },
        i = function () {
            (this.__$emitterPrivate = a({})), (this.__$emitterPublic = a({})), (this.__instancesLatestArr = []), (this.__plugins = {}), (this._env = h);
        };
    (i.prototype = {
        __bridge: function (b, c, d) {
            if (!c[d]) {
                var e = function () {};
                e.prototype = b;
                var g = new e();
                g.__init && g.__init(c),
                    a.each(b, function (a, b) {
                        0 != a.indexOf("__") &&
                            (c[a]
                                ? f.debug && console.log("The " + a + " method of the " + d + " plugin conflicts with another plugin or native methods")
                                : ((c[a] = function () {
                                      return g[a].apply(g, Array.prototype.slice.apply(arguments));
                                  }),
                                  (c[a].bridged = g)));
                    }),
                    (c[d] = g);
            }
            return this;
        },
        __setWindow: function (a) {
            return (h.window = a), this;
        },
        _getRuler: function (a) {
            return new b(a);
        },
        _off: function () {
            return this.__$emitterPrivate.off.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this;
        },
        _on: function () {
            return this.__$emitterPrivate.on.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this;
        },
        _one: function () {
            return this.__$emitterPrivate.one.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this;
        },
        _plugin: function (b) {
            var c = this;
            if ("string" == typeof b) {
                var d = b,
                    e = null;
                return (
                    d.indexOf(".") > 0
                        ? (e = c.__plugins[d])
                        : a.each(c.__plugins, function (a, b) {
                              return b.name.substring(b.name.length - d.length - 1) == "." + d ? ((e = b), !1) : void 0;
                          }),
                    e
                );
            }
            if (b.name.indexOf(".") < 0) throw new Error("Plugins must be namespaced");
            return (c.__plugins[b.name] = b), b.core && c.__bridge(b.core, c, b.name), this;
        },
        _trigger: function () {
            var a = Array.prototype.slice.apply(arguments);
            return "string" == typeof a[0] && (a[0] = { type: a[0] }), this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate, a), this.__$emitterPublic.trigger.apply(this.__$emitterPublic, a), this;
        },
        instances: function (b) {
            var c = [],
                d = b || ".tooltipstered";
            return (
                a(d).each(function () {
                    var b = a(this),
                        d = b.data("tooltipster-ns");
                    d &&
                        a.each(d, function (a, d) {
                            c.push(b.data(d));
                        });
                }),
                c
            );
        },
        instancesLatest: function () {
            return this.__instancesLatestArr;
        },
        off: function () {
            return this.__$emitterPublic.off.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this;
        },
        on: function () {
            return this.__$emitterPublic.on.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this;
        },
        one: function () {
            return this.__$emitterPublic.one.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this;
        },
        origins: function (b) {
            var c = b ? b + " " : "";
            return a(c + ".tooltipstered").toArray();
        },
        setDefaults: function (b) {
            return a.extend(f, b), this;
        },
        triggerHandler: function () {
            return this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this;
        },
    }),
        (a.tooltipster = new i()),
        (a.Tooltipster = function (b, c) {
            (this.__callbacks = { close: [], open: [] }),
                this.__closingTime,
                this.__Content,
                this.__contentBcr,
                (this.__destroyed = !1),
                (this.__$emitterPrivate = a({})),
                (this.__$emitterPublic = a({})),
                (this.__enabled = !0),
                this.__garbageCollector,
                this.__Geometry,
                this.__lastPosition,
                (this.__namespace = "tooltipster-" + Math.round(1e6 * Math.random())),
                this.__options,
                this.__$originParents,
                (this.__pointerIsOverOrigin = !1),
                (this.__previousThemes = []),
                (this.__state = "closed"),
                (this.__timeouts = { close: [], open: null }),
                (this.__touchEvents = []),
                (this.__tracker = null),
                this._$origin,
                this._$tooltip,
                this.__init(b, c);
        }),
        (a.Tooltipster.prototype = {
            __init: function (b, c) {
                var d = this;
                if (((d._$origin = a(b)), (d.__options = a.extend(!0, {}, f, c)), d.__optionsFormat(), !h.IE || h.IE >= d.__options.IEmin)) {
                    var e = null;
                    if ((void 0 === d._$origin.data("tooltipster-initialTitle") && ((e = d._$origin.attr("title")), void 0 === e && (e = null), d._$origin.data("tooltipster-initialTitle", e)), null !== d.__options.content))
                        d.__contentSet(d.__options.content);
                    else {
                        var g,
                            i = d._$origin.attr("data-tooltip-content");
                        i && (g = a(i)), g && g[0] ? d.__contentSet(g.first()) : d.__contentSet(e);
                    }
                    d._$origin.removeAttr("title").addClass("tooltipstered"),
                        d.__prepareOrigin(),
                        d.__prepareGC(),
                        a.each(d.__options.plugins, function (a, b) {
                            d._plug(b);
                        }),
                        h.hasTouchCapability &&
                            a(h.window.document.body).on("touchmove." + d.__namespace + "-triggerOpen", function (a) {
                                d._touchRecordEvent(a);
                            }),
                        d
                            ._on("created", function () {
                                d.__prepareTooltip();
                            })
                            ._on("repositioned", function (a) {
                                d.__lastPosition = a.position;
                            });
                } else d.__options.disabled = !0;
            },
            __contentInsert: function () {
                var a = this,
                    b = a._$tooltip.find(".tooltipster-content"),
                    c = a.__Content,
                    d = function (a) {
                        c = a;
                    };
                return (
                    a._trigger({ type: "format", content: a.__Content, format: d }),
                    a.__options.functionFormat && (c = a.__options.functionFormat.call(a, a, { origin: a._$origin[0] }, a.__Content)),
                    "string" != typeof c || a.__options.contentAsHTML ? b.empty().append(c) : b.text(c),
                    a
                );
            },
            __contentSet: function (b) {
                return b instanceof a && this.__options.contentCloning && (b = b.clone(!0)), (this.__Content = b), this._trigger({ type: "updated", content: b }), this;
            },
            __destroyError: function () {
                throw new Error("This tooltip has been destroyed and cannot execute your method call.");
            },
            __geometry: function () {
                var b = this,
                    c = b._$origin,
                    d = b._$origin.is("area");
                if (d) {
                    var e = b._$origin.parent().attr("name");
                    c = a('img[usemap="#' + e + '"]');
                }
                var f = c[0].getBoundingClientRect(),
                    g = a(h.window.document),
                    i = a(h.window),
                    j = c,
                    k = {
                        available: { document: null, window: null },
                        document: { size: { height: g.height(), width: g.width() } },
                        window: { scroll: { left: h.window.scrollX || h.window.document.documentElement.scrollLeft, top: h.window.scrollY || h.window.document.documentElement.scrollTop }, size: { height: i.height(), width: i.width() } },
                        origin: { fixedLineage: !1, offset: {}, size: { height: f.bottom - f.top, width: f.right - f.left }, usemapImage: d ? c[0] : null, windowOffset: { bottom: f.bottom, left: f.left, right: f.right, top: f.top } },
                    };
                if (d) {
                    var l = b._$origin.attr("shape"),
                        m = b._$origin.attr("coords");
                    if (
                        (m &&
                            ((m = m.split(",")),
                            a.map(m, function (a, b) {
                                m[b] = parseInt(a);
                            })),
                        "default" != l)
                    )
                        switch (l) {
                            case "circle":
                                var n = m[0],
                                    o = m[1],
                                    p = m[2],
                                    q = o - p,
                                    r = n - p;
                                (k.origin.size.height = 2 * p), (k.origin.size.width = k.origin.size.height), (k.origin.windowOffset.left += r), (k.origin.windowOffset.top += q);
                                break;
                            case "rect":
                                var s = m[0],
                                    t = m[1],
                                    u = m[2],
                                    v = m[3];
                                (k.origin.size.height = v - t), (k.origin.size.width = u - s), (k.origin.windowOffset.left += s), (k.origin.windowOffset.top += t);
                                break;
                            case "poly":
                                for (var w = 0, x = 0, y = 0, z = 0, A = "even", B = 0; B < m.length; B++) {
                                    var C = m[B];
                                    "even" == A ? (C > y && ((y = C), 0 === B && (w = y)), w > C && (w = C), (A = "odd")) : (C > z && ((z = C), 1 == B && (x = z)), x > C && (x = C), (A = "even"));
                                }
                                (k.origin.size.height = z - x), (k.origin.size.width = y - w), (k.origin.windowOffset.left += w), (k.origin.windowOffset.top += x);
                        }
                }
                var D = function (a) {
                    (k.origin.size.height = a.height), (k.origin.windowOffset.left = a.left), (k.origin.windowOffset.top = a.top), (k.origin.size.width = a.width);
                };
                for (
                    b._trigger({ type: "geometry", edit: D, geometry: { height: k.origin.size.height, left: k.origin.windowOffset.left, top: k.origin.windowOffset.top, width: k.origin.size.width } }),
                        k.origin.windowOffset.right = k.origin.windowOffset.left + k.origin.size.width,
                        k.origin.windowOffset.bottom = k.origin.windowOffset.top + k.origin.size.height,
                        k.origin.offset.left = k.origin.windowOffset.left + k.window.scroll.left,
                        k.origin.offset.top = k.origin.windowOffset.top + k.window.scroll.top,
                        k.origin.offset.bottom = k.origin.offset.top + k.origin.size.height,
                        k.origin.offset.right = k.origin.offset.left + k.origin.size.width,
                        k.available.document = {
                            bottom: { height: k.document.size.height - k.origin.offset.bottom, width: k.document.size.width },
                            left: { height: k.document.size.height, width: k.origin.offset.left },
                            right: { height: k.document.size.height, width: k.document.size.width - k.origin.offset.right },
                            top: { height: k.origin.offset.top, width: k.document.size.width },
                        },
                        k.available.window = {
                            bottom: { height: Math.max(k.window.size.height - Math.max(k.origin.windowOffset.bottom, 0), 0), width: k.window.size.width },
                            left: { height: k.window.size.height, width: Math.max(k.origin.windowOffset.left, 0) },
                            right: { height: k.window.size.height, width: Math.max(k.window.size.width - Math.max(k.origin.windowOffset.right, 0), 0) },
                            top: { height: Math.max(k.origin.windowOffset.top, 0), width: k.window.size.width },
                        };
                    "html" != j[0].tagName.toLowerCase();

                ) {
                    if ("fixed" == j.css("position")) {
                        k.origin.fixedLineage = !0;
                        break;
                    }
                    j = j.parent();
                }
                return k;
            },
            __optionsFormat: function () {
                return (
                    "number" == typeof this.__options.animationDuration && (this.__options.animationDuration = [this.__options.animationDuration, this.__options.animationDuration]),
                    "number" == typeof this.__options.delay && (this.__options.delay = [this.__options.delay, this.__options.delay]),
                    "number" == typeof this.__options.delayTouch && (this.__options.delayTouch = [this.__options.delayTouch, this.__options.delayTouch]),
                    "string" == typeof this.__options.theme && (this.__options.theme = [this.__options.theme]),
                    null === this.__options.parent ? (this.__options.parent = a(h.window.document.body)) : "string" == typeof this.__options.parent && (this.__options.parent = a(this.__options.parent)),
                    "hover" == this.__options.trigger
                        ? ((this.__options.triggerOpen = { mouseenter: !0, touchstart: !0 }), (this.__options.triggerClose = { mouseleave: !0, originClick: !0, touchleave: !0 }))
                        : "click" == this.__options.trigger && ((this.__options.triggerOpen = { click: !0, tap: !0 }), (this.__options.triggerClose = { click: !0, tap: !0 })),
                    this._trigger("options"),
                    this
                );
            },
            __prepareGC: function () {
                var b = this;
                return (
                    b.__options.selfDestruction
                        ? (b.__garbageCollector = setInterval(function () {
                              var c = new Date().getTime();
                              (b.__touchEvents = a.grep(b.__touchEvents, function (a, b) {
                                  return c - a.time > 6e4;
                              })),
                                  d(b._$origin) ||
                                      b.close(function () {
                                          b.destroy();
                                      });
                          }, 2e4))
                        : clearInterval(b.__garbageCollector),
                    b
                );
            },
            __prepareOrigin: function () {
                var a = this;
                if (
                    (a._$origin.off("." + a.__namespace + "-triggerOpen"),
                    h.hasTouchCapability &&
                        a._$origin.on("touchstart." + a.__namespace + "-triggerOpen touchend." + a.__namespace + "-triggerOpen touchcancel." + a.__namespace + "-triggerOpen", function (b) {
                            a._touchRecordEvent(b);
                        }),
                    a.__options.triggerOpen.click || (a.__options.triggerOpen.tap && h.hasTouchCapability))
                ) {
                    var b = "";
                    a.__options.triggerOpen.click && (b += "click." + a.__namespace + "-triggerOpen "),
                        a.__options.triggerOpen.tap && h.hasTouchCapability && (b += "touchend." + a.__namespace + "-triggerOpen"),
                        a._$origin.on(b, function (b) {
                            a._touchIsMeaningfulEvent(b) && a._open(b);
                        });
                }
                if (a.__options.triggerOpen.mouseenter || (a.__options.triggerOpen.touchstart && h.hasTouchCapability)) {
                    var b = "";
                    a.__options.triggerOpen.mouseenter && (b += "mouseenter." + a.__namespace + "-triggerOpen "),
                        a.__options.triggerOpen.touchstart && h.hasTouchCapability && (b += "touchstart." + a.__namespace + "-triggerOpen"),
                        a._$origin.on(b, function (b) {
                            (!a._touchIsTouchEvent(b) && a._touchIsEmulatedEvent(b)) || ((a.__pointerIsOverOrigin = !0), a._openShortly(b));
                        });
                }
                if (a.__options.triggerClose.mouseleave || (a.__options.triggerClose.touchleave && h.hasTouchCapability)) {
                    var b = "";
                    a.__options.triggerClose.mouseleave && (b += "mouseleave." + a.__namespace + "-triggerOpen "),
                        a.__options.triggerClose.touchleave && h.hasTouchCapability && (b += "touchend." + a.__namespace + "-triggerOpen touchcancel." + a.__namespace + "-triggerOpen"),
                        a._$origin.on(b, function (b) {
                            a._touchIsMeaningfulEvent(b) && (a.__pointerIsOverOrigin = !1);
                        });
                }
                return a;
            },
            __prepareTooltip: function () {
                var b = this,
                    c = b.__options.interactive ? "auto" : "";
                return (
                    b._$tooltip.attr("id", b.__namespace).css({ "pointer-events": c, zIndex: b.__options.zIndex }),
                    a.each(b.__previousThemes, function (a, c) {
                        b._$tooltip.removeClass(c);
                    }),
                    a.each(b.__options.theme, function (a, c) {
                        b._$tooltip.addClass(c);
                    }),
                    (b.__previousThemes = a.merge([], b.__options.theme)),
                    b
                );
            },
            __scrollHandler: function (b) {
                var c = this;
                if (c.__options.triggerClose.scroll) c._close(b);
                else if (d(c._$origin) && d(c._$tooltip)) {
                    var e = null;
                    if (b.target === h.window.document) c.__Geometry.origin.fixedLineage || (c.__options.repositionOnScroll && c.reposition(b));
                    else {
                        e = c.__geometry();
                        var f = !1;
                        if (
                            ("fixed" != c._$origin.css("position") &&
                                c.__$originParents.each(function (b, c) {
                                    var d = a(c),
                                        g = d.css("overflow-x"),
                                        h = d.css("overflow-y");
                                    if ("visible" != g || "visible" != h) {
                                        var i = c.getBoundingClientRect();
                                        if ("visible" != g && (e.origin.windowOffset.left < i.left || e.origin.windowOffset.right > i.right)) return (f = !0), !1;
                                        if ("visible" != h && (e.origin.windowOffset.top < i.top || e.origin.windowOffset.bottom > i.bottom)) return (f = !0), !1;
                                    }
                                    return "fixed" == d.css("position") ? !1 : void 0;
                                }),
                            f)
                        )
                            c._$tooltip.css("visibility", "hidden");
                        else if ((c._$tooltip.css("visibility", "visible"), c.__options.repositionOnScroll)) c.reposition(b);
                        else {
                            var g = e.origin.offset.left - c.__Geometry.origin.offset.left,
                                i = e.origin.offset.top - c.__Geometry.origin.offset.top;
                            c._$tooltip.css({ left: c.__lastPosition.coord.left + g, top: c.__lastPosition.coord.top + i });
                        }
                    }
                    c._trigger({ type: "scroll", event: b, geo: e });
                }
                return c;
            },
            __stateSet: function (a) {
                return (this.__state = a), this._trigger({ type: "state", state: a }), this;
            },
            __timeoutsClear: function () {
                return (
                    clearTimeout(this.__timeouts.open),
                    (this.__timeouts.open = null),
                    a.each(this.__timeouts.close, function (a, b) {
                        clearTimeout(b);
                    }),
                    (this.__timeouts.close = []),
                    this
                );
            },
            __trackerStart: function () {
                var a = this,
                    b = a._$tooltip.find(".tooltipster-content");
                return (
                    a.__options.trackTooltip && (a.__contentBcr = b[0].getBoundingClientRect()),
                    (a.__tracker = setInterval(function () {
                        if (d(a._$origin) && d(a._$tooltip)) {
                            if (a.__options.trackOrigin) {
                                var e = a.__geometry(),
                                    f = !1;
                                c(e.origin.size, a.__Geometry.origin.size) &&
                                    (a.__Geometry.origin.fixedLineage ? c(e.origin.windowOffset, a.__Geometry.origin.windowOffset) && (f = !0) : c(e.origin.offset, a.__Geometry.origin.offset) && (f = !0)),
                                    f || (a.__options.triggerClose.mouseleave ? a._close() : a.reposition());
                            }
                            if (a.__options.trackTooltip) {
                                var g = b[0].getBoundingClientRect();
                                (g.height === a.__contentBcr.height && g.width === a.__contentBcr.width) || (a.reposition(), (a.__contentBcr = g));
                            }
                        } else a._close();
                    }, a.__options.trackerInterval)),
                    a
                );
            },
            _close: function (b, c, d) {
                var e = this,
                    f = !0;
                if (
                    (e._trigger({
                        type: "close",
                        event: b,
                        stop: function () {
                            f = !1;
                        },
                    }),
                    f || d)
                ) {
                    c && e.__callbacks.close.push(c), (e.__callbacks.open = []), e.__timeoutsClear();
                    var g = function () {
                        a.each(e.__callbacks.close, function (a, c) {
                            c.call(e, e, { event: b, origin: e._$origin[0] });
                        }),
                            (e.__callbacks.close = []);
                    };
                    if ("closed" != e.__state) {
                        var i = !0,
                            j = new Date(),
                            k = j.getTime(),
                            l = k + e.__options.animationDuration[1];
                        if (("disappearing" == e.__state && l > e.__closingTime && e.__options.animationDuration[1] > 0 && (i = !1), i)) {
                            (e.__closingTime = l), "disappearing" != e.__state && e.__stateSet("disappearing");
                            var m = function () {
                                clearInterval(e.__tracker),
                                    e._trigger({ type: "closing", event: b }),
                                    e._$tooltip.off("." + e.__namespace + "-triggerClose").removeClass("tooltipster-dying"),
                                    a(h.window).off("." + e.__namespace + "-triggerClose"),
                                    e.__$originParents.each(function (b, c) {
                                        a(c).off("scroll." + e.__namespace + "-triggerClose");
                                    }),
                                    (e.__$originParents = null),
                                    a(h.window.document.body).off("." + e.__namespace + "-triggerClose"),
                                    e._$origin.off("." + e.__namespace + "-triggerClose"),
                                    e._off("dismissable"),
                                    e.__stateSet("closed"),
                                    e._trigger({ type: "after", event: b }),
                                    e.__options.functionAfter && e.__options.functionAfter.call(e, e, { event: b, origin: e._$origin[0] }),
                                    g();
                            };
                            h.hasTransitions
                                ? (e._$tooltip.css({
                                      "-moz-animation-duration": e.__options.animationDuration[1] + "ms",
                                      "-ms-animation-duration": e.__options.animationDuration[1] + "ms",
                                      "-o-animation-duration": e.__options.animationDuration[1] + "ms",
                                      "-webkit-animation-duration": e.__options.animationDuration[1] + "ms",
                                      "animation-duration": e.__options.animationDuration[1] + "ms",
                                      "transition-duration": e.__options.animationDuration[1] + "ms",
                                  }),
                                  e._$tooltip.clearQueue().removeClass("tooltipster-show").addClass("tooltipster-dying"),
                                  e.__options.animationDuration[1] > 0 && e._$tooltip.delay(e.__options.animationDuration[1]),
                                  e._$tooltip.queue(m))
                                : e._$tooltip.stop().fadeOut(e.__options.animationDuration[1], m);
                        }
                    } else g();
                }
                return e;
            },
            _off: function () {
                return this.__$emitterPrivate.off.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this;
            },
            _on: function () {
                return this.__$emitterPrivate.on.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this;
            },
            _one: function () {
                return this.__$emitterPrivate.one.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this;
            },
            _open: function (b, c) {
                var e = this;
                if (!e.__destroying && d(e._$origin) && e.__enabled) {
                    var f = !0;
                    if (
                        ("closed" == e.__state &&
                            (e._trigger({
                                type: "before",
                                event: b,
                                stop: function () {
                                    f = !1;
                                },
                            }),
                            f && e.__options.functionBefore && (f = e.__options.functionBefore.call(e, e, { event: b, origin: e._$origin[0] }))),
                        f !== !1 && null !== e.__Content)
                    ) {
                        c && e.__callbacks.open.push(c), (e.__callbacks.close = []), e.__timeoutsClear();
                        var g,
                            i = function () {
                                "stable" != e.__state && e.__stateSet("stable"),
                                    a.each(e.__callbacks.open, function (a, b) {
                                        b.call(e, e, { origin: e._$origin[0], tooltip: e._$tooltip[0] });
                                    }),
                                    (e.__callbacks.open = []);
                            };
                        if ("closed" !== e.__state)
                            (g = 0),
                                "disappearing" === e.__state
                                    ? (e.__stateSet("appearing"),
                                      h.hasTransitions
                                          ? (e._$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-show"),
                                            e.__options.animationDuration[0] > 0 && e._$tooltip.delay(e.__options.animationDuration[0]),
                                            e._$tooltip.queue(i))
                                          : e._$tooltip.stop().fadeIn(i))
                                    : "stable" == e.__state && i();
                        else {
                            if (
                                (e.__stateSet("appearing"),
                                (g = e.__options.animationDuration[0]),
                                e.__contentInsert(),
                                e.reposition(b, !0),
                                h.hasTransitions
                                    ? (e._$tooltip
                                          .addClass("tooltipster-" + e.__options.animation)
                                          .addClass("tooltipster-initial")
                                          .css({
                                              "-moz-animation-duration": e.__options.animationDuration[0] + "ms",
                                              "-ms-animation-duration": e.__options.animationDuration[0] + "ms",
                                              "-o-animation-duration": e.__options.animationDuration[0] + "ms",
                                              "-webkit-animation-duration": e.__options.animationDuration[0] + "ms",
                                              "animation-duration": e.__options.animationDuration[0] + "ms",
                                              "transition-duration": e.__options.animationDuration[0] + "ms",
                                          }),
                                      setTimeout(function () {
                                          "closed" != e.__state &&
                                              (e._$tooltip.addClass("tooltipster-show").removeClass("tooltipster-initial"), e.__options.animationDuration[0] > 0 && e._$tooltip.delay(e.__options.animationDuration[0]), e._$tooltip.queue(i));
                                      }, 0))
                                    : e._$tooltip.css("display", "none").fadeIn(e.__options.animationDuration[0], i),
                                e.__trackerStart(),
                                a(h.window)
                                    .on("resize." + e.__namespace + "-triggerClose", function (b) {
                                        var c = a(document.activeElement);
                                        ((c.is("input") || c.is("textarea")) && a.contains(e._$tooltip[0], c[0])) || e.reposition(b);
                                    })
                                    .on("scroll." + e.__namespace + "-triggerClose", function (a) {
                                        e.__scrollHandler(a);
                                    }),
                                (e.__$originParents = e._$origin.parents()),
                                e.__$originParents.each(function (b, c) {
                                    a(c).on("scroll." + e.__namespace + "-triggerClose", function (a) {
                                        e.__scrollHandler(a);
                                    });
                                }),
                                e.__options.triggerClose.mouseleave || (e.__options.triggerClose.touchleave && h.hasTouchCapability))
                            ) {
                                e._on("dismissable", function (a) {
                                    a.dismissable
                                        ? a.delay
                                            ? ((m = setTimeout(function () {
                                                  e._close(a.event);
                                              }, a.delay)),
                                              e.__timeouts.close.push(m))
                                            : e._close(a)
                                        : clearTimeout(m);
                                });
                                var j = e._$origin,
                                    k = "",
                                    l = "",
                                    m = null;
                                e.__options.interactive && (j = j.add(e._$tooltip)),
                                    e.__options.triggerClose.mouseleave && ((k += "mouseenter." + e.__namespace + "-triggerClose "), (l += "mouseleave." + e.__namespace + "-triggerClose ")),
                                    e.__options.triggerClose.touchleave &&
                                        h.hasTouchCapability &&
                                        ((k += "touchstart." + e.__namespace + "-triggerClose"), (l += "touchend." + e.__namespace + "-triggerClose touchcancel." + e.__namespace + "-triggerClose")),
                                    j
                                        .on(l, function (a) {
                                            if (e._touchIsTouchEvent(a) || !e._touchIsEmulatedEvent(a)) {
                                                var b = "mouseleave" == a.type ? e.__options.delay : e.__options.delayTouch;
                                                e._trigger({ delay: b[1], dismissable: !0, event: a, type: "dismissable" });
                                            }
                                        })
                                        .on(k, function (a) {
                                            (!e._touchIsTouchEvent(a) && e._touchIsEmulatedEvent(a)) || e._trigger({ dismissable: !1, event: a, type: "dismissable" });
                                        });
                            }
                            e.__options.triggerClose.originClick &&
                                e._$origin.on("click." + e.__namespace + "-triggerClose", function (a) {
                                    e._touchIsTouchEvent(a) || e._touchIsEmulatedEvent(a) || e._close(a);
                                }),
                                (e.__options.triggerClose.click || (e.__options.triggerClose.tap && h.hasTouchCapability)) &&
                                    setTimeout(function () {
                                        if ("closed" != e.__state) {
                                            var b = "",
                                                c = a(h.window.document.body);
                                            e.__options.triggerClose.click && (b += "click." + e.__namespace + "-triggerClose "),
                                                e.__options.triggerClose.tap && h.hasTouchCapability && (b += "touchend." + e.__namespace + "-triggerClose"),
                                                c.on(b, function (b) {
                                                    e._touchIsMeaningfulEvent(b) && (e._touchRecordEvent(b), (e.__options.interactive && a.contains(e._$tooltip[0], b.target)) || e._close(b));
                                                }),
                                                e.__options.triggerClose.tap &&
                                                    h.hasTouchCapability &&
                                                    c.on("touchstart." + e.__namespace + "-triggerClose", function (a) {
                                                        e._touchRecordEvent(a);
                                                    });
                                        }
                                    }, 0),
                                e._trigger("ready"),
                                e.__options.functionReady && e.__options.functionReady.call(e, e, { origin: e._$origin[0], tooltip: e._$tooltip[0] });
                        }
                        if (e.__options.timer > 0) {
                            var m = setTimeout(function () {
                                e._close();
                            }, e.__options.timer + g);
                            e.__timeouts.close.push(m);
                        }
                    }
                }
                return e;
            },
            _openShortly: function (a) {
                var b = this,
                    c = !0;
                if (
                    "stable" != b.__state &&
                    "appearing" != b.__state &&
                    !b.__timeouts.open &&
                    (b._trigger({
                        type: "start",
                        event: a,
                        stop: function () {
                            c = !1;
                        },
                    }),
                    c)
                ) {
                    var d = 0 == a.type.indexOf("touch") ? b.__options.delayTouch : b.__options.delay;
                    d[0]
                        ? (b.__timeouts.open = setTimeout(function () {
                              (b.__timeouts.open = null), b.__pointerIsOverOrigin && b._touchIsMeaningfulEvent(a) ? (b._trigger("startend"), b._open(a)) : b._trigger("startcancel");
                          }, d[0]))
                        : (b._trigger("startend"), b._open(a));
                }
                return b;
            },
            _optionsExtract: function (b, c) {
                var d = this,
                    e = a.extend(!0, {}, c),
                    f = d.__options[b];
                return (
                    f ||
                        ((f = {}),
                        a.each(c, function (a, b) {
                            var c = d.__options[a];
                            void 0 !== c && (f[a] = c);
                        })),
                    a.each(e, function (b, c) {
                        void 0 !== f[b] && ("object" != typeof c || c instanceof Array || null == c || "object" != typeof f[b] || f[b] instanceof Array || null == f[b] ? (e[b] = f[b]) : a.extend(e[b], f[b]));
                    }),
                    e
                );
            },
            _plug: function (b) {
                var c = a.tooltipster._plugin(b);
                if (!c) throw new Error('The "' + b + '" plugin is not defined');
                return c.instance && a.tooltipster.__bridge(c.instance, this, c.name), this;
            },
            _touchIsEmulatedEvent: function (a) {
                for (var b = !1, c = new Date().getTime(), d = this.__touchEvents.length - 1; d >= 0; d--) {
                    var e = this.__touchEvents[d];
                    if (!(c - e.time < 500)) break;
                    e.target === a.target && (b = !0);
                }
                return b;
            },
            _touchIsMeaningfulEvent: function (a) {
                return (this._touchIsTouchEvent(a) && !this._touchSwiped(a.target)) || (!this._touchIsTouchEvent(a) && !this._touchIsEmulatedEvent(a));
            },
            _touchIsTouchEvent: function (a) {
                return 0 == a.type.indexOf("touch");
            },
            _touchRecordEvent: function (a) {
                return this._touchIsTouchEvent(a) && ((a.time = new Date().getTime()), this.__touchEvents.push(a)), this;
            },
            _touchSwiped: function (a) {
                for (var b = !1, c = this.__touchEvents.length - 1; c >= 0; c--) {
                    var d = this.__touchEvents[c];
                    if ("touchmove" == d.type) {
                        b = !0;
                        break;
                    }
                    if ("touchstart" == d.type && a === d.target) break;
                }
                return b;
            },
            _trigger: function () {
                var b = Array.prototype.slice.apply(arguments);
                return (
                    "string" == typeof b[0] && (b[0] = { type: b[0] }),
                    (b[0].instance = this),
                    (b[0].origin = this._$origin ? this._$origin[0] : null),
                    (b[0].tooltip = this._$tooltip ? this._$tooltip[0] : null),
                    this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate, b),
                    a.tooltipster._trigger.apply(a.tooltipster, b),
                    this.__$emitterPublic.trigger.apply(this.__$emitterPublic, b),
                    this
                );
            },
            _unplug: function (b) {
                var c = this;
                if (c[b]) {
                    var d = a.tooltipster._plugin(b);
                    d.instance &&
                        a.each(d.instance, function (a, d) {
                            c[a] && c[a].bridged === c[b] && delete c[a];
                        }),
                        c[b].__destroy && c[b].__destroy(),
                        delete c[b];
                }
                return c;
            },
            close: function (a) {
                return this.__destroyed ? this.__destroyError() : this._close(null, a), this;
            },
            content: function (a) {
                var b = this;
                if (void 0 === a) return b.__Content;
                if (b.__destroyed) b.__destroyError();
                else if ((b.__contentSet(a), null !== b.__Content)) {
                    if ("closed" !== b.__state && (b.__contentInsert(), b.reposition(), b.__options.updateAnimation))
                        if (h.hasTransitions) {
                            var c = b.__options.updateAnimation;
                            b._$tooltip.addClass("tooltipster-update-" + c),
                                setTimeout(function () {
                                    "closed" != b.__state && b._$tooltip.removeClass("tooltipster-update-" + c);
                                }, 1e3);
                        } else
                            b._$tooltip.fadeTo(200, 0.5, function () {
                                "closed" != b.__state && b._$tooltip.fadeTo(200, 1);
                            });
                } else b._close();
                return b;
            },
            destroy: function () {
                var b = this;
                if (b.__destroyed) b.__destroyError();
                else {
                    "closed" != b.__state ? b.option("animationDuration", 0)._close(null, null, !0) : b.__timeoutsClear(),
                        b._trigger("destroy"),
                        (b.__destroyed = !0),
                        b._$origin.removeData(b.__namespace).off("." + b.__namespace + "-triggerOpen"),
                        a(h.window.document.body).off("." + b.__namespace + "-triggerOpen");
                    var c = b._$origin.data("tooltipster-ns");
                    if (c)
                        if (1 === c.length) {
                            var d = null;
                            "previous" == b.__options.restoration
                                ? (d = b._$origin.data("tooltipster-initialTitle"))
                                : "current" == b.__options.restoration && (d = "string" == typeof b.__Content ? b.__Content : a("<div></div>").append(b.__Content).html()),
                                d && b._$origin.attr("title", d),
                                b._$origin.removeClass("tooltipstered"),
                                b._$origin.removeData("tooltipster-ns").removeData("tooltipster-initialTitle");
                        } else
                            (c = a.grep(c, function (a, c) {
                                return a !== b.__namespace;
                            })),
                                b._$origin.data("tooltipster-ns", c);
                    b._trigger("destroyed"),
                        b._off(),
                        b.off(),
                        (b.__Content = null),
                        (b.__$emitterPrivate = null),
                        (b.__$emitterPublic = null),
                        (b.__options.parent = null),
                        (b._$origin = null),
                        (b._$tooltip = null),
                        (a.tooltipster.__instancesLatestArr = a.grep(a.tooltipster.__instancesLatestArr, function (a, c) {
                            return b !== a;
                        })),
                        clearInterval(b.__garbageCollector);
                }
                return b;
            },
            disable: function () {
                return this.__destroyed ? (this.__destroyError(), this) : (this._close(), (this.__enabled = !1), this);
            },
            elementOrigin: function () {
                return this.__destroyed ? void this.__destroyError() : this._$origin[0];
            },
            elementTooltip: function () {
                return this._$tooltip ? this._$tooltip[0] : null;
            },
            enable: function () {
                return (this.__enabled = !0), this;
            },
            hide: function (a) {
                return this.close(a);
            },
            instance: function () {
                return this;
            },
            off: function () {
                return this.__destroyed || this.__$emitterPublic.off.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this;
            },
            on: function () {
                return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.on.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this;
            },
            one: function () {
                return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.one.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this;
            },
            open: function (a) {
                return this.__destroyed ? this.__destroyError() : this._open(null, a), this;
            },
            option: function (b, c) {
                return void 0 === c
                    ? this.__options[b]
                    : (this.__destroyed
                          ? this.__destroyError()
                          : ((this.__options[b] = c), this.__optionsFormat(), a.inArray(b, ["trigger", "triggerClose", "triggerOpen"]) >= 0 && this.__prepareOrigin(), "selfDestruction" === b && this.__prepareGC()),
                      this);
            },
            reposition: function (a, b) {
                var c = this;
                return (
                    c.__destroyed
                        ? c.__destroyError()
                        : "closed" != c.__state && d(c._$origin) && (b || d(c._$tooltip)) && (b || c._$tooltip.detach(), (c.__Geometry = c.__geometry()), c._trigger({ type: "reposition", event: a, helper: { geo: c.__Geometry } })),
                    c
                );
            },
            show: function (a) {
                return this.open(a);
            },
            status: function () {
                return { destroyed: this.__destroyed, enabled: this.__enabled, open: "closed" !== this.__state, state: this.__state };
            },
            triggerHandler: function () {
                return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this;
            },
        }),
        (a.fn.tooltipster = function () {
            var b = Array.prototype.slice.apply(arguments),
                c = "You are using a single HTML element as content for several tooltips. You probably want to set the contentCloning option to TRUE.";
            if (0 === this.length) return this;
            if ("string" == typeof b[0]) {
                var d = "#*$~&";
                return (
                    this.each(function () {
                        var e = a(this).data("tooltipster-ns"),
                            f = e ? a(this).data(e[0]) : null;
                        if (!f) throw new Error("You called Tooltipster's \"" + b[0] + '" method on an uninitialized element');
                        if ("function" != typeof f[b[0]]) throw new Error('Unknown method "' + b[0] + '"');
                        this.length > 1 && "content" == b[0] && (b[1] instanceof a || ("object" == typeof b[1] && null != b[1] && b[1].tagName)) && !f.__options.contentCloning && f.__options.debug && console.log(c);
                        var g = f[b[0]](b[1], b[2]);
                        return g !== f || "instance" === b[0] ? ((d = g), !1) : void 0;
                    }),
                    "#*$~&" !== d ? d : this
                );
            }
            a.tooltipster.__instancesLatestArr = [];
            var e = b[0] && void 0 !== b[0].multiple,
                g = (e && b[0].multiple) || (!e && f.multiple),
                h = b[0] && void 0 !== b[0].content,
                i = (h && b[0].content) || (!h && f.content),
                j = b[0] && void 0 !== b[0].contentCloning,
                k = (j && b[0].contentCloning) || (!j && f.contentCloning),
                l = b[0] && void 0 !== b[0].debug,
                m = (l && b[0].debug) || (!l && f.debug);
            return (
                this.length > 1 && (i instanceof a || ("object" == typeof i && null != i && i.tagName)) && !k && m && console.log(c),
                this.each(function () {
                    var c = !1,
                        d = a(this),
                        e = d.data("tooltipster-ns"),
                        f = null;
                    e ? (g ? (c = !0) : m && (console.log("Tooltipster: one or more tooltips are already attached to the element below. Ignoring."), console.log(this))) : (c = !0),
                        c &&
                            ((f = new a.Tooltipster(this, b[0])),
                            e || (e = []),
                            e.push(f.__namespace),
                            d.data("tooltipster-ns", e),
                            d.data(f.__namespace, f),
                            f.__options.functionInit && f.__options.functionInit.call(f, f, { origin: this }),
                            f._trigger("init")),
                        a.tooltipster.__instancesLatestArr.push(f);
                }),
                this
            );
        }),
        (b.prototype = {
            __init: function (b) {
                (this.__$tooltip = b),
                    this.__$tooltip.css({ left: 0, overflow: "hidden", position: "absolute", top: 0 }).find(".tooltipster-content").css("overflow", "auto"),
                    (this.$container = a('<div class="tooltipster-ruler"></div>').append(this.__$tooltip).appendTo(h.window.document.body));
            },
            __forceRedraw: function () {
                var a = this.__$tooltip.parent();
                this.__$tooltip.detach(), this.__$tooltip.appendTo(a);
            },
            constrain: function (a, b) {
                return (this.constraints = { width: a, height: b }), this.__$tooltip.css({ display: "block", height: "", overflow: "auto", width: a }), this;
            },
            destroy: function () {
                this.__$tooltip.detach().find(".tooltipster-content").css({ display: "", overflow: "" }), this.$container.remove();
            },
            free: function () {
                return (this.constraints = null), this.__$tooltip.css({ display: "", height: "", overflow: "visible", width: "" }), this;
            },
            measure: function () {
                this.__forceRedraw();
                var a = this.__$tooltip[0].getBoundingClientRect(),
                    b = { size: { height: a.height || a.bottom - a.top, width: a.width || a.right - a.left } };
                if (this.constraints) {
                    var c = this.__$tooltip.find(".tooltipster-content"),
                        d = this.__$tooltip.outerHeight(),
                        e = c[0].getBoundingClientRect(),
                        f = { height: d <= this.constraints.height, width: a.width <= this.constraints.width && e.width >= c[0].scrollWidth - 1 };
                    b.fits = f.height && f.width;
                }
                return h.IE && h.IE <= 11 && b.size.width !== h.window.document.documentElement.clientWidth && (b.size.width = Math.ceil(b.size.width) + 1), b;
            },
        });
    var j = navigator.userAgent.toLowerCase();
    -1 != j.indexOf("msie")
        ? (h.IE = parseInt(j.split("msie")[1]))
        : -1 !== j.toLowerCase().indexOf("trident") && -1 !== j.indexOf(" rv:11")
        ? (h.IE = 11)
        : -1 != j.toLowerCase().indexOf("edge/") && (h.IE = parseInt(j.toLowerCase().split("edge/")[1]));
    var k = "tooltipster.sideTip";
    return (
        a.tooltipster._plugin({
            name: k,
            instance: {
                __defaults: function () {
                    return { arrow: !0, distance: 6, functionPosition: null, maxWidth: null, minIntersection: 16, minWidth: 0, position: null, side: "top", viewportAware: !0 };
                },
                __init: function (a) {
                    var b = this;
                    (b.__instance = a),
                        (b.__namespace = "tooltipster-sideTip-" + Math.round(1e6 * Math.random())),
                        (b.__previousState = "closed"),
                        b.__options,
                        b.__optionsFormat(),
                        b.__instance._on("state." + b.__namespace, function (a) {
                            "closed" == a.state ? b.__close() : "appearing" == a.state && "closed" == b.__previousState && b.__create(), (b.__previousState = a.state);
                        }),
                        b.__instance._on("options." + b.__namespace, function () {
                            b.__optionsFormat();
                        }),
                        b.__instance._on("reposition." + b.__namespace, function (a) {
                            b.__reposition(a.event, a.helper);
                        });
                },
                __close: function () {
                    this.__instance.content() instanceof a && this.__instance.content().detach(), this.__instance._$tooltip.remove(), (this.__instance._$tooltip = null);
                },
                __create: function () {
                    var b = a(
                        '<div class="tooltipster-base tooltipster-sidetip"><div class="tooltipster-box"><div class="tooltipster-content"></div></div><div class="tooltipster-arrow"><div class="tooltipster-arrow-uncropped"><div class="tooltipster-arrow-border"></div><div class="tooltipster-arrow-background"></div></div></div></div>'
                    );
                    this.__options.arrow || b.find(".tooltipster-box").css("margin", 0).end().find(".tooltipster-arrow").hide(),
                        this.__options.minWidth && b.css("min-width", this.__options.minWidth + "px"),
                        this.__options.maxWidth && b.css("max-width", this.__options.maxWidth + "px"),
                        (this.__instance._$tooltip = b),
                        this.__instance._trigger("created");
                },
                __destroy: function () {
                    this.__instance._off("." + self.__namespace);
                },
                __optionsFormat: function () {
                    var b = this;
                    if (
                        ((b.__options = b.__instance._optionsExtract(k, b.__defaults())),
                        b.__options.position && (b.__options.side = b.__options.position),
                        "object" != typeof b.__options.distance && (b.__options.distance = [b.__options.distance]),
                        b.__options.distance.length < 4 &&
                            (void 0 === b.__options.distance[1] && (b.__options.distance[1] = b.__options.distance[0]),
                            void 0 === b.__options.distance[2] && (b.__options.distance[2] = b.__options.distance[0]),
                            void 0 === b.__options.distance[3] && (b.__options.distance[3] = b.__options.distance[1]),
                            (b.__options.distance = { top: b.__options.distance[0], right: b.__options.distance[1], bottom: b.__options.distance[2], left: b.__options.distance[3] })),
                        "string" == typeof b.__options.side)
                    ) {
                        var c = { top: "bottom", right: "left", bottom: "top", left: "right" };
                        (b.__options.side = [b.__options.side, c[b.__options.side]]), "left" == b.__options.side[0] || "right" == b.__options.side[0] ? b.__options.side.push("top", "bottom") : b.__options.side.push("right", "left");
                    }
                    6 === a.tooltipster._env.IE && b.__options.arrow !== !0 && (b.__options.arrow = !1);
                },
                __reposition: function (b, c) {
                    var d,
                        e = this,
                        f = e.__targetFind(c),
                        g = [];
                    e.__instance._$tooltip.detach();
                    var h = e.__instance._$tooltip.clone(),
                        i = a.tooltipster._getRuler(h),
                        j = !1,
                        k = e.__instance.option("animation");
                    switch (
                        (k && h.removeClass("tooltipster-" + k),
                        a.each(["window", "document"], function (d, k) {
                            var l = null;
                            if (
                                (e.__instance._trigger({
                                    container: k,
                                    helper: c,
                                    satisfied: j,
                                    takeTest: function (a) {
                                        l = a;
                                    },
                                    results: g,
                                    type: "positionTest",
                                }),
                                1 == l || (0 != l && 0 == j && ("window" != k || e.__options.viewportAware)))
                            )
                                for (var d = 0; d < e.__options.side.length; d++) {
                                    var m = { horizontal: 0, vertical: 0 },
                                        n = e.__options.side[d];
                                    "top" == n || "bottom" == n ? (m.vertical = e.__options.distance[n]) : (m.horizontal = e.__options.distance[n]),
                                        e.__sideChange(h, n),
                                        a.each(["natural", "constrained"], function (a, d) {
                                            if (
                                                ((l = null),
                                                e.__instance._trigger({
                                                    container: k,
                                                    event: b,
                                                    helper: c,
                                                    mode: d,
                                                    results: g,
                                                    satisfied: j,
                                                    side: n,
                                                    takeTest: function (a) {
                                                        l = a;
                                                    },
                                                    type: "positionTest",
                                                }),
                                                1 == l || (0 != l && 0 == j))
                                            ) {
                                                var h = { container: k, distance: m, fits: null, mode: d, outerSize: null, side: n, size: null, target: f[n], whole: null },
                                                    o = "natural" == d ? i.free() : i.constrain(c.geo.available[k][n].width - m.horizontal, c.geo.available[k][n].height - m.vertical),
                                                    p = o.measure();
                                                if (
                                                    ((h.size = p.size),
                                                    (h.outerSize = { height: p.size.height + m.vertical, width: p.size.width + m.horizontal }),
                                                    "natural" == d ? (c.geo.available[k][n].width >= h.outerSize.width && c.geo.available[k][n].height >= h.outerSize.height ? (h.fits = !0) : (h.fits = !1)) : (h.fits = p.fits),
                                                    "window" == k &&
                                                        (h.fits
                                                            ? "top" == n || "bottom" == n
                                                                ? (h.whole = c.geo.origin.windowOffset.right >= e.__options.minIntersection && c.geo.window.size.width - c.geo.origin.windowOffset.left >= e.__options.minIntersection)
                                                                : (h.whole = c.geo.origin.windowOffset.bottom >= e.__options.minIntersection && c.geo.window.size.height - c.geo.origin.windowOffset.top >= e.__options.minIntersection)
                                                            : (h.whole = !1)),
                                                    g.push(h),
                                                    h.whole)
                                                )
                                                    j = !0;
                                                else if ("natural" == h.mode && (h.fits || h.size.width <= c.geo.available[k][n].width)) return !1;
                                            }
                                        });
                                }
                        }),
                        e.__instance._trigger({
                            edit: function (a) {
                                g = a;
                            },
                            event: b,
                            helper: c,
                            results: g,
                            type: "positionTested",
                        }),
                        g.sort(function (a, b) {
                            if (a.whole && !b.whole) return -1;
                            if (!a.whole && b.whole) return 1;
                            if (a.whole && b.whole) {
                                var c = e.__options.side.indexOf(a.side),
                                    d = e.__options.side.indexOf(b.side);
                                return d > c ? -1 : c > d ? 1 : "natural" == a.mode ? -1 : 1;
                            }
                            if (a.fits && !b.fits) return -1;
                            if (!a.fits && b.fits) return 1;
                            if (a.fits && b.fits) {
                                var c = e.__options.side.indexOf(a.side),
                                    d = e.__options.side.indexOf(b.side);
                                return d > c ? -1 : c > d ? 1 : "natural" == a.mode ? -1 : 1;
                            }
                            return "document" == a.container && "bottom" == a.side && "natural" == a.mode ? -1 : 1;
                        }),
                        (d = g[0]),
                        (d.coord = {}),
                        d.side)
                    ) {
                        case "left":
                        case "right":
                            d.coord.top = Math.floor(d.target - d.size.height / 2);
                            break;
                        case "bottom":
                        case "top":
                            d.coord.left = Math.floor(d.target - d.size.width / 2);
                    }
                    switch (d.side) {
                        case "left":
                            d.coord.left = c.geo.origin.windowOffset.left - d.outerSize.width;
                            break;
                        case "right":
                            d.coord.left = c.geo.origin.windowOffset.right + d.distance.horizontal;
                            break;
                        case "top":
                            d.coord.top = c.geo.origin.windowOffset.top - d.outerSize.height;
                            break;
                        case "bottom":
                            d.coord.top = c.geo.origin.windowOffset.bottom + d.distance.vertical;
                    }
                    "window" == d.container
                        ? "top" == d.side || "bottom" == d.side
                            ? d.coord.left < 0
                                ? c.geo.origin.windowOffset.right - this.__options.minIntersection >= 0
                                    ? (d.coord.left = 0)
                                    : (d.coord.left = c.geo.origin.windowOffset.right - this.__options.minIntersection - 1)
                                : d.coord.left > c.geo.window.size.width - d.size.width &&
                                  (c.geo.origin.windowOffset.left + this.__options.minIntersection <= c.geo.window.size.width
                                      ? (d.coord.left = c.geo.window.size.width - d.size.width)
                                      : (d.coord.left = c.geo.origin.windowOffset.left + this.__options.minIntersection + 1 - d.size.width))
                            : d.coord.top < 0
                            ? c.geo.origin.windowOffset.bottom - this.__options.minIntersection >= 0
                                ? (d.coord.top = 0)
                                : (d.coord.top = c.geo.origin.windowOffset.bottom - this.__options.minIntersection - 1)
                            : d.coord.top > c.geo.window.size.height - d.size.height &&
                              (c.geo.origin.windowOffset.top + this.__options.minIntersection <= c.geo.window.size.height
                                  ? (d.coord.top = c.geo.window.size.height - d.size.height)
                                  : (d.coord.top = c.geo.origin.windowOffset.top + this.__options.minIntersection + 1 - d.size.height))
                        : (d.coord.left > c.geo.window.size.width - d.size.width && (d.coord.left = c.geo.window.size.width - d.size.width), d.coord.left < 0 && (d.coord.left = 0)),
                        e.__sideChange(h, d.side),
                        (c.tooltipClone = h[0]),
                        (c.tooltipParent = e.__instance.option("parent").parent[0]),
                        (c.mode = d.mode),
                        (c.whole = d.whole),
                        (c.origin = e.__instance._$origin[0]),
                        (c.tooltip = e.__instance._$tooltip[0]),
                        delete d.container,
                        delete d.fits,
                        delete d.mode,
                        delete d.outerSize,
                        delete d.whole,
                        (d.distance = d.distance.horizontal || d.distance.vertical);
                    var l = a.extend(!0, {}, d);
                    if (
                        (e.__instance._trigger({
                            edit: function (a) {
                                d = a;
                            },
                            event: b,
                            helper: c,
                            position: l,
                            type: "position",
                        }),
                        e.__options.functionPosition)
                    ) {
                        var m = e.__options.functionPosition.call(e, e.__instance, c, l);
                        m && (d = m);
                    }
                    i.destroy();
                    var n, o;
                    "top" == d.side || "bottom" == d.side
                        ? ((n = { prop: "left", val: d.target - d.coord.left }), (o = d.size.width - this.__options.minIntersection))
                        : ((n = { prop: "top", val: d.target - d.coord.top }), (o = d.size.height - this.__options.minIntersection)),
                        n.val < this.__options.minIntersection ? (n.val = this.__options.minIntersection) : n.val > o && (n.val = o);
                    var p;
                    (p = c.geo.origin.fixedLineage ? c.geo.origin.windowOffset : { left: c.geo.origin.windowOffset.left + c.geo.window.scroll.left, top: c.geo.origin.windowOffset.top + c.geo.window.scroll.top }),
                        (d.coord = { left: p.left + (d.coord.left - c.geo.origin.windowOffset.left), top: p.top + (d.coord.top - c.geo.origin.windowOffset.top) }),
                        e.__sideChange(e.__instance._$tooltip, d.side),
                        c.geo.origin.fixedLineage ? e.__instance._$tooltip.css("position", "fixed") : e.__instance._$tooltip.css("position", ""),
                        e.__instance._$tooltip.css({ left: d.coord.left, top: d.coord.top, height: d.size.height, width: d.size.width }).find(".tooltipster-arrow").css({ left: "", top: "" }).css(n.prop, n.val),
                        e.__instance._$tooltip.appendTo(e.__instance.option("parent")),
                        e.__instance._trigger({ type: "repositioned", event: b, position: d });
                },
                __sideChange: function (a, b) {
                    a.removeClass("tooltipster-bottom")
                        .removeClass("tooltipster-left")
                        .removeClass("tooltipster-right")
                        .removeClass("tooltipster-top")
                        .addClass("tooltipster-" + b);
                },
                __targetFind: function (a) {
                    var b = {},
                        c = this.__instance._$origin[0].getClientRects();
                    if (c.length > 1) {
                        var d = this.__instance._$origin.css("opacity");
                        1 == d && (this.__instance._$origin.css("opacity", 0.99), (c = this.__instance._$origin[0].getClientRects()), this.__instance._$origin.css("opacity", 1));
                    }
                    if (c.length < 2)
                        (b.top = Math.floor(a.geo.origin.windowOffset.left + a.geo.origin.size.width / 2)), (b.bottom = b.top), (b.left = Math.floor(a.geo.origin.windowOffset.top + a.geo.origin.size.height / 2)), (b.right = b.left);
                    else {
                        var e = c[0];
                        (b.top = Math.floor(e.left + (e.right - e.left) / 2)),
                            (e = c.length > 2 ? c[Math.ceil(c.length / 2) - 1] : c[0]),
                            (b.right = Math.floor(e.top + (e.bottom - e.top) / 2)),
                            (e = c[c.length - 1]),
                            (b.bottom = Math.floor(e.left + (e.right - e.left) / 2)),
                            (e = c.length > 2 ? c[Math.ceil((c.length + 1) / 2) - 1] : c[c.length - 1]),
                            (b.left = Math.floor(e.top + (e.bottom - e.top) / 2));
                    }
                    return b;
                },
            },
        }),
        a
    );
});

/**
 *  Ajax Autocomplete for jQuery, version 1.4.10
 *  (c) 2017 Tomas Kirda
 *
 *  Ajax Autocomplete for jQuery is freely distributable under the terms of an MIT-style license.
 *  For details, see the web site: https://github.com/devbridge/jQuery-Autocomplete
 */
!(function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports && "function" == typeof require ? require("jquery") : jQuery);
})(function (a) {
    "use strict";
    function b(c, d) {
        var e = this;
        (e.element = c),
            (e.el = a(c)),
            (e.suggestions = []),
            (e.badQueries = []),
            (e.selectedIndex = -1),
            (e.currentValue = e.element.value),
            (e.timeoutId = null),
            (e.cachedResponse = {}),
            (e.onChangeTimeout = null),
            (e.onChange = null),
            (e.isLocal = !1),
            (e.suggestionsContainer = null),
            (e.noSuggestionsContainer = null),
            (e.options = a.extend(!0, {}, b.defaults, d)),
            (e.classes = { selected: "autocomplete-selected", suggestion: "autocomplete-suggestion" }),
            (e.hint = null),
            (e.hintValue = ""),
            (e.selection = null),
            e.initialize(),
            e.setOptions(d);
    }
    function c(a, b, c) {
        return a.value.toLowerCase().indexOf(c) !== -1;
    }
    function d(b) {
        return "string" == typeof b ? a.parseJSON(b) : b;
    }
    function e(a, b) {
        if (!b) return a.value;
        var c = "(" + g.escapeRegExChars(b) + ")";
        return a.value
            .replace(new RegExp(c, "gi"), "<strong>$1</strong>")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/&lt;(\/?strong)&gt;/g, "<$1>");
    }
    function f(a, b) {
        return '<div class="autocomplete-group">' + b + "</div>";
    }
    var g = (function () {
            return {
                escapeRegExChars: function (a) {
                    return a.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
                },
                createNode: function (a) {
                    var b = document.createElement("div");
                    return (b.className = a), (b.style.position = "absolute"), (b.style.display = "none"), b;
                },
            };
        })(),
        h = { ESC: 27, TAB: 9, RETURN: 13, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 },
        i = a.noop;
    (b.utils = g),
        (a.Autocomplete = b),
        (b.defaults = {
            ajaxSettings: {},
            autoSelectFirst: !1,
            appendTo: "body",
            serviceUrl: null,
            lookup: null,
            onSelect: null,
            width: "auto",
            minChars: 1,
            maxHeight: 300,
            deferRequestBy: 0,
            params: {},
            formatResult: e,
            formatGroup: f,
            delimiter: null,
            zIndex: 9999,
            type: "GET",
            noCache: !1,
            onSearchStart: i,
            onSearchComplete: i,
            onSearchError: i,
            preserveInput: !1,
            containerClass: "autocomplete-suggestions",
            tabDisabled: !1,
            dataType: "text",
            currentRequest: null,
            triggerSelectOnValidInput: !0,
            preventBadQueries: !0,
            lookupFilter: c,
            paramName: "query",
            transformResult: d,
            showNoSuggestionNotice: !1,
            noSuggestionNotice: "No results",
            orientation: "bottom",
            forceFixPosition: !1,
        }),
        (b.prototype = {
            initialize: function () {
                var c,
                    d = this,
                    e = "." + d.classes.suggestion,
                    f = d.classes.selected,
                    g = d.options;
                d.element.setAttribute("autocomplete", "off"),
                    (d.noSuggestionsContainer = a('<div class="autocomplete-no-suggestion"></div>').html(this.options.noSuggestionNotice).get(0)),
                    (d.suggestionsContainer = b.utils.createNode(g.containerClass)),
                    (c = a(d.suggestionsContainer)),
                    c.appendTo(g.appendTo || "body"),
                    "auto" !== g.width && c.css("width", g.width),
                    c.on("mouseover.autocomplete", e, function () {
                        d.activate(a(this).data("index"));
                    }),
                    c.on("mouseout.autocomplete", function () {
                        (d.selectedIndex = -1), c.children("." + f).removeClass(f);
                    }),
                    c.on("click.autocomplete", e, function () {
                        d.select(a(this).data("index"));
                    }),
                    c.on("click.autocomplete", function () {
                        clearTimeout(d.blurTimeoutId);
                    }),
                    (d.fixPositionCapture = function () {
                        d.visible && d.fixPosition();
                    }),
                    a(window).on("resize.autocomplete", d.fixPositionCapture),
                    d.el.on("keydown.autocomplete", function (a) {
                        d.onKeyPress(a);
                    }),
                    d.el.on("keyup.autocomplete", function (a) {
                        d.onKeyUp(a);
                    }),
                    d.el.on("blur.autocomplete", function () {
                        d.onBlur();
                    }),
                    d.el.on("focus.autocomplete", function () {
                        d.onFocus();
                    }),
                    d.el.on("change.autocomplete", function (a) {
                        d.onKeyUp(a);
                    }),
                    d.el.on("input.autocomplete", function (a) {
                        d.onKeyUp(a);
                    });
            },
            onFocus: function () {
                var a = this;
                a.fixPosition(), a.el.val().length >= a.options.minChars && a.onValueChange();
            },
            onBlur: function () {
                var b = this,
                    c = b.options,
                    d = b.el.val(),
                    e = b.getQuery(d);
                b.blurTimeoutId = setTimeout(function () {
                    b.hide(), b.selection && b.currentValue !== e && (c.onInvalidateSelection || a.noop).call(b.element);
                }, 200);
            },
            abortAjax: function () {
                var a = this;
                a.currentRequest && (a.currentRequest.abort(), (a.currentRequest = null));
            },
            setOptions: function (b) {
                var c = this,
                    d = a.extend({}, c.options, b);
                (c.isLocal = Array.isArray(d.lookup)),
                    c.isLocal && (d.lookup = c.verifySuggestionsFormat(d.lookup)),
                    (d.orientation = c.validateOrientation(d.orientation, "bottom")),
                    a(c.suggestionsContainer).css({ "max-height": d.maxHeight + "px", width: d.width + "px", "z-index": d.zIndex }),
                    (this.options = d);
            },
            clearCache: function () {
                (this.cachedResponse = {}), (this.badQueries = []);
            },
            clear: function () {
                this.clearCache(), (this.currentValue = ""), (this.suggestions = []);
            },
            disable: function () {
                var a = this;
                (a.disabled = !0), clearTimeout(a.onChangeTimeout), a.abortAjax();
            },
            enable: function () {
                this.disabled = !1;
            },
            fixPosition: function () {
                var b = this,
                    c = a(b.suggestionsContainer),
                    d = c.parent().get(0);
                if (d === document.body || b.options.forceFixPosition) {
                    var e = b.options.orientation,
                        f = c.outerHeight(),
                        g = b.el.outerHeight(),
                        h = b.el.offset(),
                        i = { top: h.top, left: h.left };
                    if ("auto" === e) {
                        var j = a(window).height(),
                            k = a(window).scrollTop(),
                            l = -k + h.top - f,
                            m = k + j - (h.top + g + f);
                        e = Math.max(l, m) === l ? "top" : "bottom";
                    }
                    if (("top" === e ? (i.top += -f) : (i.top += g), d !== document.body)) {
                        var n,
                            o = c.css("opacity");
                        b.visible || c.css("opacity", 0).show(), (n = c.offsetParent().offset()), (i.top -= n.top), (i.top += d.scrollTop), (i.left -= n.left), b.visible || c.css("opacity", o).hide();
                    }
                    "auto" === b.options.width && (i.width = b.el.outerWidth() + "px"), c.css(i);
                }
            },
            isCursorAtEnd: function () {
                var a,
                    b = this,
                    c = b.el.val().length,
                    d = b.element.selectionStart;
                return "number" == typeof d ? d === c : !document.selection || ((a = document.selection.createRange()), a.moveStart("character", -c), c === a.text.length);
            },
            onKeyPress: function (a) {
                var b = this;
                if (!b.disabled && !b.visible && a.which === h.DOWN && b.currentValue) return void b.suggest();
                if (!b.disabled && b.visible) {
                    switch (a.which) {
                        case h.ESC:
                            b.el.val(b.currentValue), b.hide();
                            break;
                        case h.RIGHT:
                            if (b.hint && b.options.onHint && b.isCursorAtEnd()) {
                                b.selectHint();
                                break;
                            }
                            return;
                        case h.TAB:
                            if (b.hint && b.options.onHint) return void b.selectHint();
                            if (b.selectedIndex === -1) return void b.hide();
                            if ((b.select(b.selectedIndex), b.options.tabDisabled === !1)) return;
                            break;
                        case h.RETURN:
                            if (b.selectedIndex === -1) return void b.hide();
                            b.select(b.selectedIndex);
                            break;
                        case h.UP:
                            b.moveUp();
                            break;
                        case h.DOWN:
                            b.moveDown();
                            break;
                        default:
                            return;
                    }
                    a.stopImmediatePropagation(), a.preventDefault();
                }
            },
            onKeyUp: function (a) {
                var b = this;
                if (!b.disabled) {
                    switch (a.which) {
                        case h.UP:
                        case h.DOWN:
                            return;
                    }
                    clearTimeout(b.onChangeTimeout),
                        b.currentValue !== b.el.val() &&
                            (b.findBestHint(),
                            b.options.deferRequestBy > 0
                                ? (b.onChangeTimeout = setTimeout(function () {
                                      b.onValueChange();
                                  }, b.options.deferRequestBy))
                                : b.onValueChange());
                }
            },
            onValueChange: function () {
                if (this.ignoreValueChange) return void (this.ignoreValueChange = !1);
                var b = this,
                    c = b.options,
                    d = b.el.val(),
                    e = b.getQuery(d);
                return (
                    b.selection && b.currentValue !== e && ((b.selection = null), (c.onInvalidateSelection || a.noop).call(b.element)),
                    clearTimeout(b.onChangeTimeout),
                    (b.currentValue = d),
                    (b.selectedIndex = -1),
                    c.triggerSelectOnValidInput && b.isExactMatch(e) ? void b.select(0) : void (e.length < c.minChars ? b.hide() : b.getSuggestions(e))
                );
            },
            isExactMatch: function (a) {
                var b = this.suggestions;
                return 1 === b.length && b[0].value.toLowerCase() === a.toLowerCase();
            },
            getQuery: function (b) {
                var c,
                    d = this.options.delimiter;
                return d ? ((c = b.split(d)), a.trim(c[c.length - 1])) : b;
            },
            getSuggestionsLocal: function (b) {
                var c,
                    d = this,
                    e = d.options,
                    f = b.toLowerCase(),
                    g = e.lookupFilter,
                    h = parseInt(e.lookupLimit, 10);
                return (
                    (c = {
                        suggestions: a.grep(e.lookup, function (a) {
                            return g(a, b, f);
                        }),
                    }),
                    h && c.suggestions.length > h && (c.suggestions = c.suggestions.slice(0, h)),
                    c
                );
            },
            getSuggestions: function (b) {
                var c,
                    d,
                    e,
                    f,
                    g = this,
                    h = g.options,
                    i = h.serviceUrl;
                if (((h.params[h.paramName] = b), h.onSearchStart.call(g.element, h.params) !== !1)) {
                    if (((d = h.ignoreParams ? null : h.params), a.isFunction(h.lookup)))
                        return void h.lookup(b, function (a) {
                            (g.suggestions = a.suggestions), g.suggest(), h.onSearchComplete.call(g.element, b, a.suggestions);
                        });
                    g.isLocal ? (c = g.getSuggestionsLocal(b)) : (a.isFunction(i) && (i = i.call(g.element, b)), (e = i + "?" + a.param(d || {})), (c = g.cachedResponse[e])),
                        c && Array.isArray(c.suggestions)
                            ? ((g.suggestions = c.suggestions), g.suggest(), h.onSearchComplete.call(g.element, b, c.suggestions))
                            : g.isBadQuery(b)
                            ? h.onSearchComplete.call(g.element, b, [])
                            : (g.abortAjax(),
                              (f = { url: i, data: d, type: h.type, dataType: h.dataType }),
                              a.extend(f, h.ajaxSettings),
                              (g.currentRequest = a
                                  .ajax(f)
                                  .done(function (a) {
                                      var c;
                                      (g.currentRequest = null), (c = h.transformResult(a, b)), g.processResponse(c, b, e), h.onSearchComplete.call(g.element, b, c.suggestions);
                                  })
                                  .fail(function (a, c, d) {
                                      h.onSearchError.call(g.element, b, a, c, d);
                                  })));
                }
            },
            isBadQuery: function (a) {
                if (!this.options.preventBadQueries) return !1;
                for (var b = this.badQueries, c = b.length; c--; ) if (0 === a.indexOf(b[c])) return !0;
                return !1;
            },
            hide: function () {
                var b = this,
                    c = a(b.suggestionsContainer);
                a.isFunction(b.options.onHide) && b.visible && b.options.onHide.call(b.element, c), (b.visible = !1), (b.selectedIndex = -1), clearTimeout(b.onChangeTimeout), a(b.suggestionsContainer).hide(), b.signalHint(null);
            },
            suggest: function () {
                if (!this.suggestions.length) return void (this.options.showNoSuggestionNotice ? this.noSuggestions() : this.hide());
                var b,
                    c = this,
                    d = c.options,
                    e = d.groupBy,
                    f = d.formatResult,
                    g = c.getQuery(c.currentValue),
                    h = c.classes.suggestion,
                    i = c.classes.selected,
                    j = a(c.suggestionsContainer),
                    k = a(c.noSuggestionsContainer),
                    l = d.beforeRender,
                    m = "",
                    n = function (a, c) {
                        var f = a.data[e];
                        return b === f ? "" : ((b = f), d.formatGroup(a, b));
                    };
                return d.triggerSelectOnValidInput && c.isExactMatch(g)
                    ? void c.select(0)
                    : (a.each(c.suggestions, function (a, b) {
                          e && (m += n(b, g, a)), (m += '<div class="' + h + '" data-index="' + a + '">' + f(b, g, a) + "</div>");
                      }),
                      this.adjustContainerWidth(),
                      k.detach(),
                      j.html(m),
                      a.isFunction(l) && l.call(c.element, j, c.suggestions),
                      c.fixPosition(),
                      j.show(),
                      d.autoSelectFirst &&
                          ((c.selectedIndex = 0),
                          j.scrollTop(0),
                          j
                              .children("." + h)
                              .first()
                              .addClass(i)),
                      (c.visible = !0),
                      void c.findBestHint());
            },
            noSuggestions: function () {
                var b = this,
                    c = b.options.beforeRender,
                    d = a(b.suggestionsContainer),
                    e = a(b.noSuggestionsContainer);
                this.adjustContainerWidth(), e.detach(), d.empty(), d.append(e), a.isFunction(c) && c.call(b.element, d, b.suggestions), b.fixPosition(), d.show(), (b.visible = !0);
            },
            adjustContainerWidth: function () {
                var b,
                    c = this,
                    d = c.options,
                    e = a(c.suggestionsContainer);
                "auto" === d.width ? ((b = c.el.outerWidth()), e.css("width", b > 0 ? b : 300)) : "flex" === d.width && e.css("width", "");
            },
            findBestHint: function () {
                var b = this,
                    c = b.el.val().toLowerCase(),
                    d = null;
                c &&
                    (a.each(b.suggestions, function (a, b) {
                        var e = 0 === b.value.toLowerCase().indexOf(c);
                        return e && (d = b), !e;
                    }),
                    b.signalHint(d));
            },
            signalHint: function (b) {
                var c = "",
                    d = this;
                b && (c = d.currentValue + b.value.substr(d.currentValue.length)), d.hintValue !== c && ((d.hintValue = c), (d.hint = b), (this.options.onHint || a.noop)(c));
            },
            verifySuggestionsFormat: function (b) {
                return b.length && "string" == typeof b[0]
                    ? a.map(b, function (a) {
                          return { value: a, data: null };
                      })
                    : b;
            },
            validateOrientation: function (b, c) {
                return (b = a.trim(b || "").toLowerCase()), a.inArray(b, ["auto", "bottom", "top"]) === -1 && (b = c), b;
            },
            processResponse: function (a, b, c) {
                var d = this,
                    e = d.options;
                (a.suggestions = d.verifySuggestionsFormat(a.suggestions)),
                    e.noCache || ((d.cachedResponse[c] = a), e.preventBadQueries && !a.suggestions.length && d.badQueries.push(b)),
                    b === d.getQuery(d.currentValue) && ((d.suggestions = a.suggestions), d.suggest());
            },
            activate: function (b) {
                var c,
                    d = this,
                    e = d.classes.selected,
                    f = a(d.suggestionsContainer),
                    g = f.find("." + d.classes.suggestion);
                return f.find("." + e).removeClass(e), (d.selectedIndex = b), d.selectedIndex !== -1 && g.length > d.selectedIndex ? ((c = g.get(d.selectedIndex)), a(c).addClass(e), c) : null;
            },
            selectHint: function () {
                var b = this,
                    c = a.inArray(b.hint, b.suggestions);
                b.select(c);
            },
            select: function (a) {
                var b = this;
                b.hide(), b.onSelect(a);
            },
            moveUp: function () {
                var b = this;
                if (b.selectedIndex !== -1)
                    return 0 === b.selectedIndex
                        ? (a(b.suggestionsContainer)
                              .children("." + b.classes.suggestion)
                              .first()
                              .removeClass(b.classes.selected),
                          (b.selectedIndex = -1),
                          (b.ignoreValueChange = !1),
                          b.el.val(b.currentValue),
                          void b.findBestHint())
                        : void b.adjustScroll(b.selectedIndex - 1);
            },
            moveDown: function () {
                var a = this;
                a.selectedIndex !== a.suggestions.length - 1 && a.adjustScroll(a.selectedIndex + 1);
            },
            adjustScroll: function (b) {
                var c = this,
                    d = c.activate(b);
                if (d) {
                    var e,
                        f,
                        g,
                        h = a(d).outerHeight();
                    (e = d.offsetTop),
                        (f = a(c.suggestionsContainer).scrollTop()),
                        (g = f + c.options.maxHeight - h),
                        e < f ? a(c.suggestionsContainer).scrollTop(e) : e > g && a(c.suggestionsContainer).scrollTop(e - c.options.maxHeight + h),
                        c.options.preserveInput || ((c.ignoreValueChange = !0), c.el.val(c.getValue(c.suggestions[b].value))),
                        c.signalHint(null);
                }
            },
            onSelect: function (b) {
                var c = this,
                    d = c.options.onSelect,
                    e = c.suggestions[b];
                (c.currentValue = c.getValue(e.value)),
                    c.currentValue === c.el.val() || c.options.preserveInput || c.el.val(c.currentValue),
                    c.signalHint(null),
                    (c.suggestions = []),
                    (c.selection = e),
                    a.isFunction(d) && d.call(c.element, e);
            },
            getValue: function (a) {
                var b,
                    c,
                    d = this,
                    e = d.options.delimiter;
                return e ? ((b = d.currentValue), (c = b.split(e)), 1 === c.length ? a : b.substr(0, b.length - c[c.length - 1].length) + a) : a;
            },
            dispose: function () {
                var b = this;
                b.el.off(".autocomplete").removeData("autocomplete"), a(window).off("resize.autocomplete", b.fixPositionCapture), a(b.suggestionsContainer).remove();
            },
        }),
        (a.fn.devbridgeAutocomplete = function (c, d) {
            var e = "autocomplete";
            return arguments.length
                ? this.each(function () {
                      var f = a(this),
                          g = f.data(e);
                      "string" == typeof c ? g && "function" == typeof g[c] && g[c](d) : (g && g.dispose && g.dispose(), (g = new b(this, c)), f.data(e, g));
                  })
                : this.first().data(e);
        }),
        a.fn.autocomplete || (a.fn.autocomplete = a.fn.devbridgeAutocomplete);
});

/**
 * jQuery alterClass plugin
 *
 * Remove element classes with wildcard matching. Optionally add classes:
 *   $( '#foo' ).alterClass( 'foo-* bar-*', 'foobar' )
 *
 * Copyright (c) 2011 Pete Boere (the-echoplex.net)
 * Free under terms of the MIT license: http://www.opensource.org/licenses/mit-license.php
 *
 */
(function ($) {
    $.fn.alterClass = function (removals, additions) {
        var self = this;
        if (removals.indexOf("*") === -1) {
            // Use native jQuery methods if there is no wildcard matching
            self.removeClass(removals);
            return !additions ? self : self.addClass(additions);
        }
        var patt = new RegExp("\\s" + removals.replace(/\*/g, "[A-Za-z0-9-_]+").split(" ").join("\\s|\\s") + "\\s", "g");

        self.each(function (i, it) {
            var cn = " " + it.className + " ";
            while (patt.test(cn)) {
                cn = cn.replace(patt, " ");
            }
            it.className = $.trim(cn);
        });
        return !additions ? self : self.addClass(additions);
    };
})(jQuery);