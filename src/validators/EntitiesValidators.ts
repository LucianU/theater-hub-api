import { inject, injectable }      from "inversify";
import { TYPES }                   from "../types";
const { check }                    = require("express-validator/check");
import { IEntitiesValidators }     from "./IEntitiesValidators";
import { ILocalizationService }    from "../services";
import { SocialMediaCategoryType } from "../enums";
import { Validators }              from "../utils";

@injectable()
export class EntitiesValidators implements IEntitiesValidators {

    private readonly _localizationService: ILocalizationService;

    constructor(@inject(TYPES.LocalizationService) localizationService: ILocalizationService) {
        this._localizationService   = localizationService;
    }

    public getAwardValidators() {

        return [
            check("Title").not().isEmpty().withMessage((value: string, { req }: any) => {
                    return this._localizationService.getText("validation.award.title.required", req.Locale);
                })
                .isLength({ max: 50 }).withMessage((value: string, { req }: any) => {
                    return this._localizationService.getText("validation.award.title.length", req.Locale);
                }),
            check("Issuer").not().isEmpty().withMessage((value: string, { req }: any) => {
                    return this._localizationService.getText("validation.award.issuer.required", req.Locale);
                })
                .isLength({ max: 50 }).withMessage((value: string, { req }: any) => {
                    return this._localizationService.getText("validation.award.issuer.length", req.Locale);
                }),
            check("Description").optional().isLength({ max: 500 }).withMessage((value: string, { req }: any) => {
                return this._localizationService.getText("validation.award.description.length", req.Locale);
            })
        ];
    }

    public getEducationValidators() {

        return [
            check("Title").not().isEmpty().withMessage((value: string, { req }: any) => {
                    return this._localizationService.getText("validation.education.title.required", req.Locale);
                })
                .isLength({ max: 50 }).withMessage((value: string, { req }: any) => {
                    return this._localizationService.getText("validation.education.title.length", req.Locale);
                }),
            check("Institution").not().isEmpty().withMessage((value: string, { req }: any) => {
                    return this._localizationService.getText("validation.education.institution.required", req.Locale);
                })
                .isLength({ max: 50 }).withMessage((value: string, { req }: any) => {
                    return this._localizationService.getText("validation.education.institution.length", req.Locale);
                }),
            check("Description").optional().isLength({ max: 500 }).withMessage((value: string, { req }: any) => {
                return this._localizationService.getText("validation.education.description.length", req.Locale);
            })
        ];
    }

    public getExperienceValidators() {

        return [
            check("Position").not().isEmpty().withMessage((value: string, { req }: any) => {
                    return this._localizationService.getText("validation.experience.position.required", req.Locale);
                })
                .isLength({ max: 50 }).withMessage((value: string, { req }: any) => {
                    return this._localizationService.getText("validation.experience.position.length", req.Locale);
                }),
            check("Employer").not().isEmpty().withMessage((value: string, { req }: any) => {
                    return this._localizationService.getText("validation.experience.employer.required", req.Locale);
                })
                .isLength({ max: 50 }).withMessage((value: string, { req }: any) => {
                    return this._localizationService.getText("validation.experience.employer.length", req.Locale);
                }),
            check("Description").optional().isLength({ max: 500 }).withMessage((value: string, { req }: any) => {
                return this._localizationService.getText("validation.experience.description.length", req.Locale);
            })
        ];
    }

    public getUserVideoValidators() {

        return [
            check("Video").not().isEmpty().withMessage((value: string, { req }: any) => {
                return this._localizationService.getText("validation.video.required", req.Locale);
            })
            .custom((value: string, { req }: any) => {
                if (!Validators.isValidSocialMediaURL(value, SocialMediaCategoryType.Youtube | SocialMediaCategoryType.Vimeo )) {
                    throw new Error(this._localizationService.getText("validation.video.invalid", req.Locale));
                }

                return true;
            })
        ];
    }

}
