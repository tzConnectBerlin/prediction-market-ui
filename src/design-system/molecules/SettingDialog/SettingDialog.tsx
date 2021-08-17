import styled from '@emotion/styled';
import { Grid, IconButton, Popover, PopoverOrigin, Theme, useTheme } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosSettings } from 'react-icons/io';
import { RiRefreshLine } from 'react-icons/ri';
import { Typography } from '../../atoms/Typography';
import { FormikTextField } from '../FormikTextField';

const StyledIconButton = styled(IconButton)<{ theme: Theme }>`
  &.settingIsOpened {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;
const StyledGrid = styled(Grid)<{ theme: Theme }>`
  padding: ${({ theme }) => theme.spacing(2)};
`;

export type SettingValues = {
  deadline: number;
  maxSlippage: number;
};

export interface SettingDialogProps {
  anchorOriginX?: PopoverOrigin['horizontal'];
  anchorOriginY?: PopoverOrigin['vertical'];
  initialSettingValues: SettingValues;
}

export const SettingDialog: React.FC<SettingDialogProps> = ({
  anchorOriginX = 'right',
  anchorOriginY = 'bottom',
  initialSettingValues,
}) => {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'settingPopover' : undefined;
  const settingValueStorage = localStorage.getItem('settingValues');
  const [settingValues, setSettingValues] = React.useState({} as SettingValues);

  const setValues = (value?: SettingValues) => {
    if (!value && settingValueStorage) {
      setSettingValues(JSON.parse(settingValueStorage));
    } else {
      setSettingValues({
        deadline: value?.deadline || 0,
        maxSlippage: value?.maxSlippage || 0,
      });
    }
  };

  React.useEffect(() => {
    setValues;
  }, []);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    localStorage.setItem(
      'settingValues',
      JSON.stringify(
        Object.keys(settingValues).length === 0 ? initialSettingValues : settingValues,
      ),
    );
  };

  const setDeadlineValue = (deadline?: number) => {
    console.log(settingValues);
    setValues({ ...settingValues, deadline: deadline || initialSettingValues.deadline });
  };

  const setMaxSlippage = (maxSlippage?: number) => {
    setValues({
      ...settingValues,
      maxSlippage: maxSlippage || initialSettingValues.maxSlippage,
    });
  };

  return (
    <>
      <StyledIconButton
        aria-label="setting"
        aria-describedby={id}
        onClick={handleClick}
        theme={theme}
        className={open ? 'settingIsOpened' : undefined}
      >
        <IoIosSettings />
      </StyledIconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: anchorOriginY,
          horizontal: anchorOriginX,
        }}
      >
        <Formik initialValues={initialSettingValues} onSubmit={handleClose}>
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
                  chipOnClick={setMaxSlippage}
                  chipIcon={<RiRefreshLine />}
                  onChange={(e: any) => setMaxSlippage(e.target.value)}
                  InputProps={{
                    endAdornment: <Typography color="text.secondary">%</Typography>,
                  }}
                />
              </Grid>
              <Grid item>
                <Field
                  component={FormikTextField}
                  label={t('deadline')}
                  name="deadline"
                  type="number"
                  pattern="[0-9]*"
                  fullWidth
                  chip
                  chipText={t('reset')}
                  chipOnClick={setDeadlineValue}
                  chipIcon={<RiRefreshLine />}
                  onChange={(e: any) => setDeadlineValue(e.target.value)}
                  InputProps={{
                    endAdornment: <Typography color="text.secondary">mins</Typography>,
                  }}
                />
              </Grid>
            </StyledGrid>
          </Form>
        </Formik>
      </Popover>
    </>
  );
};
