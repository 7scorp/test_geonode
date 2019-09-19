# -*- coding: utf-8 -*-
#########################################################################
#
# Copyright (C) 2018 OSGeo
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program. If not, see <http://www.gnu.org/licenses/>.
#
#########################################################################
from django.apps import AppConfig as BaseAppConfig
from django.db import models
from django.utils.translation import ugettext_lazy as _

def run_setup_hooks(*args, **kwargs):
    from django.conf import settings
    from .celery_app import app as celery_app
    if celery_app not in settings.INSTALLED_APPS:
        settings.INSTALLED_APPS += (celery_app, )


class AppConfig(BaseAppConfig):

    name = "geonode"
    label = "geonode"

    ### Customization - start -
    def _get_logger(self):
        import logging
        return logging.getLogger(self.__class__.__module__)

    def patch_resource_base(self, cls):
        self._get_logger().info("Patching Resource Base")

        #adding Protected Area Reference field
        paRefId_help_text = _('Add a Protected Area Reference WDPAID code')
        paRefId = models.TextField(_('Add a Protected Area Reference (wdpaid)'),blank=True,null=True,help_text=paRefId_help_text)
        cls.add_to_class('paRefId',paRefId)

        #adding External Data Reference field
        externalDataReference_help_text = _('Add an External Data Reference')
        externalDataReference = models.TextField(_('External Data Reference'),blank=True,null=True,help_text=externalDataReference_help_text)
        cls.add_to_class('externalDataReference',externalDataReference)

        #adding Inspire category Annex I TextArea field
        inspireA_I_help_text = _('Select inspire category annex i to change')
        inspireA_I = models.TextField(_('Inspire category Annex I'),blank=True,null=True,help_text=inspireA_I_help_text)
        cls.add_to_class('inspireA_I',inspireA_I)

        #adding Inspire category Annex II TextArea field
        inspireA_II_help_text = _('Select inspire category annex ii to change')
        inspireA_II = models.TextField(_('Inspire category Annex II'),blank=True,null=True,help_text=inspireA_II_help_text)
        cls.add_to_class('inspireA_II',inspireA_II)

        #adding Inspire category Annex III TextArea field
        inspireA_III_help_text = _('Select inspire category annex iii to change')
        inspireA_III = models.TextField(_('Inspire category Annex III'),blank=True,null=True,help_text=inspireA_III_help_text)
        cls.add_to_class('inspireA_III',inspireA_III)


        #adding Distribution Description TextArea field
        dist_desc_help_text = _('Detailed text description of what the online resource is/does')
        dist_desc = models.TextField(_('Distribution description'),blank=True,null=True,help_text=dist_desc_help_text)
        cls.add_to_class('dist_desc',dist_desc)

        #adding Suggested Citation TextArea field
        sugg_cit_help_text = _("General explanation of the data producer's knowledge about the lineage of a dataset")
        sugg_cit = models.TextField(_('Suggested citation'),blank=True,null=True,help_text=sugg_cit_help_text)
        cls.add_to_class('sugg_cit',sugg_cit)
    ##.Customization - end -

    def ready(self):
        super(AppConfig, self).ready()
        run_setup_hooks()

        ### Customization - start -
        from geonode.base.models import ResourceBase
        self.patch_resource_base(ResourceBase)
        ##.Customization - end -
