import React, { useEffect, useState } from 'react'
import { RouterProps } from 'react-router'
import dayjs, { Dayjs } from 'dayjs'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { createMark } from '../../apis'
import s from "./style.module.scss";

const schema = Yup.object().shape({
    description: Yup.string().required('该项为必填项')
})

export function CreateMark(props: any & RouterProps) {
    // props

    // states
    const [date, setDate] = useState<Dayjs>(dayjs().startOf("date"))

    // effects
    useEffect(() => {
        setDate(dayjs(props.match.params.date))
    }, [])

    // functions
    function handleCancel() {
        props.history.go(-1)
    }
    function handleCreate() { }
    function handleSubmit(values: any, actions: any) {
        createMark({
            date: date.toString(),
            ...values
        })
            .then(() => {
                actions.setSubmitting(true)
                props.history.go(-1)
            }).finally(() => {
                actions.setSubmitting(false)
            })
    }
    return (
        <div className={s["layout"]}>
            <div>
                <Formik
                    {...{
                        initialValues: {
                            description: 'hi~'
                        },
                        validationSchema: schema,
                        onSubmit: handleSubmit,
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset,
                        isSubmitting,
                    }) =>
                        <Form
                            onReset={handleReset}
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <div>
                                    <input
                                        type="text"
                                        name="description"
                                        value={values.description}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>{touched.description && errors.description}</div>
                            </div>
                            <div>
                                <button type="submit" onClick={handleCreate}>确定</button>
                                <button type="button" onClick={handleCancel}>取消</button>
                            </div>
                        </Form>
                    }
                </Formik>
            </div>
        </div>
    )
}
