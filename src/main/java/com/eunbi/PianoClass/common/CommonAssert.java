package com.eunbi.PianoClass.common;

import org.springframework.util.Assert;

import java.util.function.Supplier;

public class CommonAssert extends Assert {

    public static <T> T nullSafeValue(T value, Supplier<? extends T> defaultValue) {
        notNull(defaultValue, "defaultValue must not be null");
        return value != null ? value : nullSafeGet(defaultValue);
    }

    public static <T> T nullSafeGet(Supplier<? extends T> sup) {
        return sup != null ? sup.get() : null;
    }
}
