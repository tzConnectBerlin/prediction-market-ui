import styled from '@emotion/styled';
import { Box, Grid, Theme, useMediaQuery, useTheme } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { RiRefreshLine } from 'react-icons/ri';
import { DEADLINE, SLIPPAGE } from '../../../globals';
import { SettingValues } from '../../../interfaces';
import { useStore } from '../../../store/store';
import { saveSettingValues } from '../../../utils/misc';
import { CustomChip } from '../../atoms/CustomChip';
import { ToggleSwitch } from '../../atoms/ToggleSwitch';
import { Typography } from '../../atoms/Typography';
import { FormikTextField } from '../FormikTextField';

const StyledGrid = styled(Grid)<{ theme: Theme }>`
  padding: ${({ theme }) => theme.spacing(2)};
`;

const StyledField = styled(Field)`
  flex-basis: 30%;
`;

const NoopMethod = () => {};

export const SettingDialog: React.FC = () => {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { advanced, slippage, deadline, setAdvanced, setSlippage, setDeadline } = useStore();

  const setAdvancedValue = React.useCallback(
    (value: boolean) => {
      const newSettings: SettingValues = {
        advanced: value,
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
        deadline: e?.target?.value ?? e,
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
        maxSlippage: e?.target?.value ?? e,
      };
      saveSettingValues(newSettings);
      setSlippage(Number(newSettings.maxSlippage));
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
              alignContent={isMobile ? 'center' : 'flex-start'}
              justifyContent="center"
              theme={theme}
            >
              <Grid item container justifyContent="space-between">
                <Typography component="div" color="primary" paddingX="0.5rem">
                  {t('slippageSettings')}
                </Typography>
                <CustomChip
                  onClick={() => {
                    setFieldValue('maxSlippage', SLIPPAGE);
                    setFieldValue('deadline', DEADLINE);
                    setMaxSlippage(SLIPPAGE);
                    setDeadline(DEADLINE);
                  }}
                  label={
                    <Grid container>
                      <RiRefreshLine />
                      {t('reset')}
                    </Grid>
                  }
                />
              </Grid>
              <Grid item container display="flex">
                <Typography alignSelf="center" flexBasis="70%">
                  {t('maxSlippage')}
                </Typography>
                <StyledField
                  component={FormikTextField}
                  name="maxSlippage"
                  type="number"
                  pattern="[0-9]*"
                  fullWidth
                  handleChange={setMaxSlippage}
                  InputProps={{
                    endAdornment: <Typography color="text.secondary">%</Typography>,
                  }}
                />
              </Grid>
              <Grid item container display="flex">
                <Typography alignSelf="center" flexBasis="70%">
                  {t('executionTimeout')}
                </Typography>
                <StyledField
                  component={FormikTextField}
                  name="deadline"
                  type="number"
                  pattern="[0-9]*"
                  fullWidth
                  handleChange={setDeadlineValue}
                  InputProps={{
                    endAdornment: <Typography color="text.secondary">{t('mins')}</Typography>,
                  }}
                />
              </Grid>
              <Grid item>
                <Field
                  component={ToggleSwitch}
                  name="advanced"
                  onChange={setAdvancedValue}
                  label={t('advancedView')}
                  tooltip
                  state={advanced}
                />
              </Grid>
            </StyledGrid>
          </Form>
        )}
      </Formik>
    </>
  );
};
