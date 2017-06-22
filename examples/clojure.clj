(ns ms.core)

; Constants
(def ^{:private true :const true} S 1000)
(def ^{:private true :const true} M (* S 60))
(def ^{:private true :const true} H (* M 60))
(def ^{:private true :const true} D (* H 24))
(def ^{:private true :const true} Y (* D 365.25))

; Helpers
(defn- short-format
  [val n name]
  (-> val (/ n) Math/floor bigint (str name)))

; Public
(defn ms
  "Format the given value"
  [val]
  (cond
    (>= val Y) (short-format val Y "y")
    (>= val D) (short-format val D "d")
    (>= val H) (short-format val H "h")
    (>= val M) (short-format val M "m")
    (>= val S) (short-format val S "s")
    :else      (str val "ms")))
