package com.example.demo.model;

/*
แสดงผลลัพธ์การดำเนินการตรวจสอบความถูกต้องว่าสำเร็จหรือไม่และให้แสดง error message หากไม่สำเร็จ
*/
public class ValidateResult {
    private final boolean ok;
    private final String errorMessage;

    public boolean ok() {
        return ok;
    }

    public String errorMessage() {
        return errorMessage;
    }

    public static ValidateResult success() {
        return new ValidateResult(true, "");
    }

    public static ValidateResult failed(String text) {
        return new ValidateResult(false, text);
    }

    private ValidateResult(boolean ok, String message) {
        this.ok = ok;
        this.errorMessage = message;
    }
}
