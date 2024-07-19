package com.excellence.demo.model;

import java.util.stream.Stream;

public enum OrderStatus {
    PENDING,
    COMPLETED,
    CANCELLED;

    public static boolean validOf(String text) {
        return Stream.of(values())
                .map(OrderStatus::name)
                .anyMatch(text::equals);
    }
}