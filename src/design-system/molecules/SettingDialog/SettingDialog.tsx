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
import { FormikTextField } from '../FormikTextField';

const StyledGrid = styled(Grid)<{ theme: Theme }>`
  padding: ${({ theme }) => theme.spacing(2)};
`;

const NoopMethod = () => {};

export const SettingDialog: React.FC = () => {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const { slippage, deadline, setSlippage, setDeadline } = useStore();

  const setDeadlineValue = React.useCallback(
    (e: any) => {
      const newSettings: SettingValues = {
        maxSlippage: slippage,
        deadline: e.target.value,
      };
      saveSettingValues(newSettings);
      setDeadline(Number(newSettings.deadline));
    },
    [setDeadline, slippage],
  );

  const setMaxSlippage = React.useCallback(
    (e: any) => {
      const newSettings: SettingValues = {
        deadline,
        maxSlippage: e.target.value,
      };
      saveSettingValues(newSettings);
      setSlippage(Number(e.target.value));
    },
    [deadline, setSlippage],
  );

  const initialSettingValues: SettingValues = {
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
