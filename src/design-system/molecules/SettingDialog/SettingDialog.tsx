import styled from '@emotion/styled';
import { Grid, Theme, useTheme } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { RiRefreshLine } from 'react-icons/ri';
import { SettingValues } from '../../../interfaces';
import { useStore } from '../../../store/store';
import { saveSettingValues } from '../../../utils/misc';
import { Typography } from '../../atoms/Typography';
import FormikCheckbox from '../FormikCheckbox';
import { FormikTextField } from '../FormikTextField';

const StyledGrid = styled(Grid)<{ theme: Theme }>`
  padding: ${({ theme }) => theme.spacing(2)};
`;

const NoopMethod = () => {};

export const SettingDialog: React.FC = () => {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const { advanced, slippage, deadline, setAdvanced, setSlippage, setDeadline } = useStore();

  const setAdvancedValue = React.useCallback(
    (e: any) => {
      const newSettings: SettingValues = {
        advanced: !!e.target.checked,
        maxSlippage: slippage,
        deadline,
      };
      saveSettingValues(newSettings);
      setAdvanced(newSettings.advanced);
    },
    [deadline, setAdvanced, slippage],
  );
  const setDeadlineValue = React.useCallback(
    (e: any) => {
      const newSettings: SettingValues = {
        advanced,
        maxSlippage: slippage,
        deadline: e.target.value,
      };
      saveSettingValues(newSettings);
      setDeadline(Number(newSettings.deadline));
    },
    [advanced, setDeadline, slippage],
  );

  const setMaxSlippage = React.useCallback(
    (e: any) => {
      const newSettings: SettingValues = {
        advanced,
        deadline,
        maxSlippage: e.target.value,
      };
      saveSettingValues(newSettings);
      setSlippage(Number(e.target.value));
    },
    [advanced, deadline, setSlippage],
  );

  const initialSettingValues: SettingValues = {
    advanced: false,
    deadline,
    maxSlippage: slippage,
  };

  return (
    <>
      <Formik initialValues={initialSettingValues} enableReinitialize onSubmit={NoopMethod}>
        {({ setFieldValue }) => (
          <Form>
            <StyledGrid
              container
              spacing={3}
              direction="column"
              alignContent="flex-start"
              justifyContent="center"
              theme={theme}
            >
              <Grid item>
                <Field
                  component={FormikCheckbox}
                  label={t('advanced')}
                  name="advanced"
                  onChange={setAdvancedValue}
                  checked={initialSettingValues.advanced}
                />
              </Grid>
              <Grid item>
                <Field
                  component={FormikTextField}
                  label={t('maxSlippage')}
                  name="maxSlippage"
                  type="number"
                  pattern="[0-9]*"
                  fullWidth
                  chip
                  chipText={t('reset')}
                  chipOnClick={() => setFieldValue('maxSlippage', initialSettingValues.maxSlippage)}
                  chipIcon={<RiRefreshLine />}
                  handleChange={setMaxSlippage}
                  InputProps={{
                    endAdornment: <Typography color="text.secondary">%</Typography>,
                  }}
                />
              </Grid>
              <Grid item>
                <Field
                  component={FormikTextField}
                  label={t('executionTimeout')}
                  name="deadline"
                  type="number"
                  pattern="[0-9]*"
                  fullWidth
                  chip
                  chipText={t('reset')}
                  chipOnClick={() => setFieldValue('deadline', initialSettingValues.deadline)}
                  chipIcon={<RiRefreshLine />}
                  handleChange={setDeadlineValue}
                  InputProps={{
                    endAdornment: <Typography color="text.secondary">{t('mins')}</Typography>,
                  }}
                />
              </Grid>
            </StyledGrid>
          </Form>
        )}
      </Formik>
    </>
  );
};
