import { expect, Locator } from "@playwright/test";
import * as allure from "allure-js-commons";

export const clickElement = async (locator: Locator) => {
    await allure.step(`Clicking element ${locator.toString()}`, async () => {
        await locator.scrollIntoViewIfNeeded();
        await locator.click();
    });
};

export const enterText = async (locator: Locator, text: string) => {
    await allure.step(`Entering text ${text} into ${locator.toString()}`, async () => {
        await locator.fill(text);
    });
};

export const getTextContent = async (locator: Locator): Promise<string> => {
    const text = (await locator.textContent())?.trim() || "";
    return text;
};

export const verifyTextEquals = async (locator: Locator, expectedText: string) => {
    await allure.step(`Verifying text ${expectedText} equals ${locator.toString()}`, async () => {
        await expect(locator).toHaveText(expectedText);
    });
};

export const verifyGreaterThan = async (value: number, expected: number) => {
    await allure.step(`Verifying value ${value} is greater than ${expected}`, async () => {
        expect(value).toBeGreaterThan(expected);
    });
};

export const getAllElements = async (locator: Locator): Promise<Locator[]> => {
    
    return await locator.all();
};

export const assertEqual = async <T>(actual: T, expected: T, errorMessage: string = "Values do not match") => {
    await allure.step(`Asserting ${actual} equals ${expected}`, async () => {
        expect(actual).toBe(expected);
    });
};